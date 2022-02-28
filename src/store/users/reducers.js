import types from "./types";

const initialState = [
  {
    name: "Bob",
    followers: 12900,
    followings: 800,
    like: false
  },
  {
    name: "Dormamu",
    followers: 12900,
    followings: 800,
    like: false
  },
  {
    name: "Thomas",
    followers: 12900,
    followings: 800,
    like: false
  },
  {
    name: "Black Mamba",
    followers: 12900,
    followings: 800,
    like: false
  },
];

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
