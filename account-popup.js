// Adds a hover "Sign in" popup to the profile/account icon in the top nav bar,
// on every page. Looks for either markup pattern used across the site:
//   <div class="nav-icon" aria-label="profile">...</div>   (most pages)
//   <div class="icon-wrap" aria-label="account">...</div>  (homepage)
// No HTML changes are needed on individual pages beyond including this script.

(function () {
  var STYLE_ID = 'account-popup-styles';

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.account-popup-target { position: relative; }',
      '.account-popup {',
      '  position: absolute;',
      '  top: calc(100% + 12px);',
      '  right: 0;',
      '  min-width: 200px;',
      '  background: #ffffff;',
      '  border: 1px solid #e2e8f0;',
      '  border-radius: 10px;',
      '  box-shadow: 0 12px 28px rgba(0,0,0,0.15);',
      '  padding: 16px;',
      '  text-align: center;',
      '  opacity: 0;',
      '  visibility: hidden;',
      '  transform: translateY(6px);',
      '  transition: opacity .15s ease, transform .15s ease, visibility .15s ease;',
      '  z-index: 999;',
      '}',
      '.account-popup::before {',
      '  content: "";',
      '  position: absolute;',
      '  top: -6px;',
      '  right: 16px;',
      '  width: 12px;',
      '  height: 12px;',
      '  background: #ffffff;',
      '  border-left: 1px solid #e2e8f0;',
      '  border-top: 1px solid #e2e8f0;',
      '  transform: rotate(45deg);',
      '}',
      '.account-popup-target:hover .account-popup,',
      '.account-popup-target:focus-within .account-popup {',
      '  opacity: 1;',
      '  visibility: visible;',
      '  transform: translateY(0);',
      '}',
      '.account-popup-greet {',
      '  font-size: 0.85rem;',
      '  color: #666e7a;',
      '  margin-bottom: 10px;',
      '}',
      '.account-popup-btn {',
      '  display: block;',
      '  width: 100%;',
      '  background: var(--primary, var(--brand, #4B2E83));',
      '  color: #ffffff;',
      '  border: none;',
      '  padding: 10px 16px;',
      '  border-radius: 8px;',
      '  font-weight: 700;',
      '  font-size: 0.9rem;',
      '  cursor: pointer;',
      '  font-family: inherit;',
      '}',
      '.account-popup-btn:hover {',
      '  background: var(--primary-hover, var(--brand-dark, #392065));',
      '}',
      '.account-popup-divider {',
      '  border: none;',
      '  border-top: 1px solid #e2e8f0;',
      '  margin: 12px 0;',
      '}',
      '.account-popup-create {',
      '  font-size: 0.85rem;',
      '  color: #666e7a;',
      '}',
      '.account-popup-create a {',
      '  color: var(--primary, var(--brand, #4B2E83));',
      '  font-weight: 700;',
      '  text-decoration: none;',
      '}',
      '.account-popup-create a:hover {',
      '  text-decoration: underline;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function buildPopup() {
    var popup = document.createElement('div');
    popup.className = 'account-popup';
    popup.innerHTML =
      '<p class="account-popup-greet">Hello, sign in for the best experience</p>' +
      '<button type="button" class="account-popup-btn">Sign in</button>' +
      '<hr class="account-popup-divider" />' +
      '<p class="account-popup-create">New customer? <a href="#">Create Account</a></p>';
    return popup;
  }

  function enhance(el) {
    if (!el || el.classList.contains('account-popup-target')) return;
    el.classList.add('account-popup-target');
    el.appendChild(buildPopup());
  }

  function init() {
    injectStyles();
    document.querySelectorAll('.nav-icon[aria-label="profile"], .icon-wrap[aria-label="account"]')
      .forEach(enhance);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
