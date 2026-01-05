console.log('Hello World!');



if (!window.__navDropdownCloseSetupDone) {
  window.__navDropdownCloseSetupDone = true;
  const setup = () => {
    const lists = Array.from(document.querySelectorAll('.nav_megamenu.w-dropdown-list'));
    lists.forEach((list) => {
      const closeBtn = list.querySelector('.nav_close-btn');
      const dropdown = list.closest('.w-dropdown');
      const toggle = dropdown ? dropdown.querySelector('.w-dropdown-toggle') : null;
      const close = () => {
        const wasOpen = list.classList.contains('w--open');
        if (toggle) {
          try {
            if (window.jQuery) {
              window.jQuery(toggle).trigger('mousedown');
              window.jQuery(toggle).trigger('mouseup');
              window.jQuery(toggle).trigger('click');
            } else {
              toggle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
              toggle.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
              toggle.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            }
          } catch {}
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus({ preventScroll: true });
        }
        if (wasOpen) {
          setTimeout(() => {
            list.classList.remove('w--open');
          }, 0);
        }
      };
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          close();
        });
      }
      list.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          close();
        }
      });
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else {
    setup();
  }
}
