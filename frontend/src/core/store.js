export const { getState, initState, setState, subscribe, unsubscribe } = (function () {
  const globalState = new Map();

  function initState({ key, defaultValue }) {
    if (globalState.has(key)) return;
    globalState.set(key, { _state: defaultValue, _observers: new Map() });

    return key;
  }

  function subscribe(key, component, cb) {
    if (!globalState.has(key)) return;

    const bundle = globalState.get(key);
    bundle._observers.set(component, cb);
  }

  function unsubscribe(key, component) {
    if (!globalState.has(key)) return;

    const bundle = globalState.get(key);
    bundle._observers.delete(component);
  }

  function getState(key) {
    if (!globalState.has(key)) return;
    return globalState.get(key)._state;
  }

  function setState(key) {
    return function (newState) {
      if (!globalState.has(key)) return;
      globalState.get(key)._state = newState;
      notify(key);
    };
  }

  function notify(key) {
    const bundle = globalState.get(key);
    bundle._observers.forEach((cb) => cb());
  }

  return {
    initState,
    subscribe,
    unsubscribe,
    getState,
    setState,
  };
})();
