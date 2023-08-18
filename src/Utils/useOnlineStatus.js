import { useSyncExternalStore } from 'react';

export function useOnlineStatus () {
  const isOnline = useSyncExternalStore(subscribe, getOnlineStatus);
  return isOnline;
}

function getOnlineStatus () {
  return navigator.onLine;
}

function logStatus (callback) {
  console.log (`Internet Access is ${getOnlineStatus ()}`);
  return callback ? callback () : null;
}

function subscribe (callback) {
  window.addEventListener ('online', logStatus);
  window.addEventListener('offline', () => console.log ('Internet Access is ko') && callback ? callback () : null );
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
