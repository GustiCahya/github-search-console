import types from "./types";

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LIKED_USERS:
      return action.payload;
    case types.LIKE_USER:
      return state.some(item => item.id === action.payload.id) ? state : [...state, action.payload];
    case types.DISLIKE_USER:
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
}
export default reducer;
