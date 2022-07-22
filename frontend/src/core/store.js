const { getState, initState, notify, setState, subscribe, unsubscribe } = (function () {
  const globalState = new Map();

  function initState({ key, defaultValue }) {
    if (globalState.has(key)) return;
    globalState.set(key, { _state: defaultValue, _observers: new Set() });

    return key;
  }

  function subscribe(key, cb) {
    const bundle = globalState.get(key);
    bundle._observers.add(cb);
  }

  function unsubscribe(key, observer) {
    if (!globalState.has(key)) return;
    const bundle = globalState.get(key);
    bundle._observers.delete(observer);
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

  function useState(key) {
    if (!globalState.has(key)) return;

    return [getState(key), setState(key)];
  }

  return {
    initState,
    subscribe,
    unsubscribe,
    notify,
    getState,
    setState,
    useState,
  };
})();

export { getState, initState, notify, setState, subscribe, unsubscribe };
