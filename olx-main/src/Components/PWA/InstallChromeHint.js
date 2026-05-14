import React, { useEffect, useState } from 'react';
import './InstallChromeHint.css';

const DISMISS_KEY = 'olx_install_chrome_hint_dismissed';

function isStandaloneDisplay() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: window-controls-overlay)').matches ||
    window.navigator.standalone === true
  );
}

function isChromiumDesktopOrMobile() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (/Firefox\//.test(ua)) return false;
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return false;
  return /Chrome\//.test(ua) || /Edg\//.test(ua) || /OPR\//.test(ua);
}

/**
 * Many users expect an automatic install popup. Chrome often does not show one;
 * install is usually under ⋮ → Install / Save and share → Install. This bar
 * explains that when the site is otherwise installable (HTTPS or localhost).
 */
function InstallChromeHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.isSecureContext) return;
      if (isStandaloneDisplay()) return;
      if (!isChromiumDesktopOrMobile()) return;
      if (sessionStorage.getItem(DISMISS_KEY) === '1') return;
      setVisible(true);
    } catch {
      // sessionStorage blocked
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="installChromeHint" role="region" aria-label="Install app help">
      <p className="installChromeHintText">
        <strong>Install as an app:</strong> Chrome menu{' '}
        <span className="installChromeHintMono">⋮</span> → look for{' '}
        <strong>Install OLX Marketplace</strong> or{' '}
        <strong>Save and share</strong> → <strong>Install page as app</strong>.
        You need HTTPS (or localhost). If you do not see it, refresh once after
        the page fully loads.
      </p>
      <button
        type="button"
        className="installChromeHintClose"
        onClick={() => {
          try {
            sessionStorage.setItem(DISMISS_KEY, '1');
          } catch {
            /* ignore */
          }
          setVisible(false);
        }}
        aria-label="Dismiss install hint"
      >
        ×
      </button>
    </div>
  );
}

export default InstallChromeHint;
