import types from "./types";

const initialState = {
  totalCount: 0,
  pagesLength: 0,
  items: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USERS:
      return action.payload;
    default:
      return state;
  }
}
export default reducer;
