function getCurrentState(localStorageKey, initialValue, reviver) {
    let savedState = localStorage.getItem(localStorageKey);
    let currentState = savedState ? JSON.parse(savedState, reviver) : initialValue;

    return currentState;
}