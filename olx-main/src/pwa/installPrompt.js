/**
 * Captures beforeinstallprompt so the UI can offer "Install app" (Chrome / Edge).
 */

let deferredPrompt = null;
const listeners = new Set();

function notify() {
  listeners.forEach((fn) => {
    try {
      fn(deferredPrompt);
    } catch (e) {
      console.warn('installPrompt listener error', e);
    }
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Do not call preventDefault(): Chrome may hide its own install affordances
    // if we block the default. We still keep the event for our "Install app" button.
    deferredPrompt = e;
    notify();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    notify();
  });
}

export function subscribeInstallPrompt(listener) {
  listeners.add(listener);
  if (deferredPrompt) listener(deferredPrompt);
  return () => listeners.delete(listener);
}

export function canShowInstallButton() {
  return Boolean(deferredPrompt);
}

export async function promptInstall() {
  if (!deferredPrompt) return { outcome: 'unavailable' };
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  notify();
  return { outcome };
}
