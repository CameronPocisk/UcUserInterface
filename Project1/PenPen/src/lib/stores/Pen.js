// Source of truth right here. 

import { writable } from 'svelte/store';

function createPenStore() {
  const { subscribe, update } = writable({ 
    currentColor: '#000000', 
    size: 2 
});
  return {
    subscribe,
    setColor: (css) => update(p => ({ ...p, color: css })),
    setSize: (px) => update(p => ({ ...p, size: px }))
  };
}

export const pen = createPenStore();