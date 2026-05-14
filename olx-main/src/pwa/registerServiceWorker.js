/**
 * Registers the PWA service worker (production and localhost for testing).
 */

function isLocalhost() {
  const { hostname } = window.location;
  return (
    hostname === 'localhost' ||
    hostname === '[::1]' ||
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(hostname)
  );
}

function doRegister() {
  const swUrl = `${process.env.PUBLIC_URL || ''}/sw.js`;
  navigator.serviceWorker
    .register(swUrl)
    .then((reg) => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log('Service worker registered:', reg.scope);
      }
      return navigator.serviceWorker.ready;
    })
    .then(() => {
      window.dispatchEvent(new CustomEvent('olx-sw-active'));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.warn('Service worker registration failed:', err);
    });
}

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  const shouldRegister =
    process.env.NODE_ENV === 'production' || isLocalhost();
  if (!shouldRegister) return;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', doRegister, { once: true });
  } else {
    doRegister();
  }
}
