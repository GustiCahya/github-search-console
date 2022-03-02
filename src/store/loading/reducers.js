import types from "./types";

function reducer(state = false, action) {
  switch (action.type) {
    case types.SET_LOADING:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;