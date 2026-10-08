/* CHIC – quick add-to-cart + wishlist for chic product cards outside the
   homepage sections (collection pages, incl. cards loaded by infinite scroll).
   Homepage/recommendation sections wire their own cards, so they are skipped. */
(function () {
  var OWNED = '.chic-products, [data-chic-recs]';
  var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
  var toast;
  var toastTimer;

  function showToast(msg) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'chic-toast';
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2400);
  }

  function readWishlist() {
    try { return JSON.parse(localStorage.getItem('chic-wishlist') || '[]'); } catch (e) { return []; }
  }

  function markWished(scope) {
    var wished = readWishlist();
    (scope || document).querySelectorAll('[data-chic-wish]').forEach(function (btn) {
      if (btn.closest(OWNED)) return;
      btn.classList.toggle('on', wished.indexOf(btn.dataset.chicWish) > -1);
    });
  }

  document.addEventListener('click', function (evt) {
    var wish = evt.target.closest('[data-chic-wish]');
    if (wish && !wish.closest(OWNED)) {
      evt.preventDefault();
      evt.stopPropagation();
      var wished = readWishlist();
      var id = wish.dataset.chicWish;
      var i = wished.indexOf(id);
      if (i > -1) wished.splice(i, 1); else wished.push(id);
      wish.classList.toggle('on', i === -1);
      try { localStorage.setItem('chic-wishlist', JSON.stringify(wished)); } catch (e) { /* private mode */ }
      return;
    }

    var add = evt.target.closest('[data-chic-add]');
    if (!add || add.closest(OWNED) || add.disabled) return;
    evt.preventDefault();
    add.disabled = true;
    fetch(root + 'cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ id: Number(add.dataset.chicAdd), quantity: 1 })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('add failed');
        return fetch(root + 'cart.js');
      })
      .then(function (res) { return res.json(); })
      .then(function (cart) {
        var e = new Event('shopify:cart:lines-update', { bubbles: true });
        e.promise = Promise.resolve({ cart: { totalQuantity: cart.item_count }, detail: { itemCount: cart.item_count } });
        document.dispatchEvent(e);
        add.classList.add('done');
        showToast('Added to cart ✓');
        setTimeout(function () { add.classList.remove('done'); }, 1600);
      })
      .catch(function () { showToast('Could not add to cart'); })
      .finally(function () { add.disabled = false; });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { markWished(); });
  } else {
    markWished();
  }

  // cards added later (infinite scroll, filtering, sorting)
  new MutationObserver(function (records) {
    records.forEach(function (r) {
      r.addedNodes.forEach(function (n) { if (n.nodeType === 1) markWished(n); });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
