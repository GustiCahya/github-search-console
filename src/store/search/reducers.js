import types from "./types";

function reducer(state = "", action) {
  switch (action.type) {
    case types.SET_SEARCH:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;