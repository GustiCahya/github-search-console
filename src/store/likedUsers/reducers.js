import types from "./types";

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LIKE_USER:
      return state.some(item => item.id === action.payload.id) ? state : [...state, action.payload];
    default:
      return state;
  }
}
export default reducer;
