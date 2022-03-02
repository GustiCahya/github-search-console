import types from "./types";

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER:
      return action.payload;
    default:
      return state;
  }
}
export default reducer;
