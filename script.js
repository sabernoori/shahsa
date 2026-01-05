console.log('Hello World!');



if (!window.__navDropdownCloseSetupDone) {
  window.__navDropdownCloseSetupDone = true;
  const setup = () => {
    const lists = Array.from(document.querySelectorAll('.nav_megamenu.w-dropdown-list'));
    const overlay = document.querySelector('.nav_overlay');
    const setOverlay = (open) => {
      if (!overlay) return;
      if (open) {
        overlay.classList.remove('is-closing');
        overlay.classList.add('is-open');
      } else {
        if (overlay.classList.contains('is-open')) {
          overlay.classList.remove('is-open');
          overlay.classList.add('is-closing');
          const onEnd = (e) => {
            if (e.target !== overlay) return;
            overlay.classList.remove('is-closing');
            overlay.removeEventListener('transitionend', onEnd);
          };
          overlay.addEventListener('transitionend', onEnd, { once: true });
        }
      }
    };
    
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
            setOverlay(false);
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
      const observer = new MutationObserver(() => {
        const anyOpen = lists.some((l) => l.classList.contains('w--open'));
        setOverlay(anyOpen);
      });
      observer.observe(list, { attributes: true, attributeFilter: ['class'] });
    });
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        lists.forEach((list) => {
          if (list.classList.contains('w--open')) {
            const dropdown = list.closest('.w-dropdown');
            const toggle = dropdown ? dropdown.querySelector('.w-dropdown-toggle') : null;
            if (toggle) {
              try {
                if (window.jQuery) {
                  window.jQuery(toggle).trigger('mousedown').trigger('mouseup').trigger('click');
                } else {
                  toggle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
                  toggle.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
                  toggle.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                }
              } catch {}
            }
            list.classList.remove('w--open');
          }
        });
        setOverlay(false);
      });
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else {
    setup();
  }
}
