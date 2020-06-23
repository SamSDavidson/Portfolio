// take init state and handlers
export default function createReducer(initialState, handlers) {
  // returns reducer function called for each dispatch
  return function reducer(state = initialState, action) {
    if (handlers[action.type]) {
      // return the state
      return handlers[action.type](state, action);
    }
    return state;
  };
}
