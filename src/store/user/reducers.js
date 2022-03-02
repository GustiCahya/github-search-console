import types from "./types";

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER:
      return {...state, ...action.payload};
    case types.SET_REPOSITORIES:
      return {...state, repositories: action.payload};
    case types.SET_FOLLOWERS:
      return {...state, followers_items: action.payload};
    case types.SET_FOLLOWING:
      return {...state, following_items: action.payload};
    default:
      return state;
  }
}
export default reducer;
