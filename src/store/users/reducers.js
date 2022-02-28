import types from "./types";

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USERS:
      return action.payload;
    case types.LIKE_USER:
      return state.map((item) =>
        item.id === action.payload.id ? { ...state, like: action.payload.like } : item
      );
    default:
      return state;
  }
}
export default reducer;
