import types from "./types";

const initialState = {
  main: false,
  cards: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LOADING:
      return {...state, main: action.payload};
    case types.SET_LOADING_CARDS:
      return {...state, cards: action.payload};
    default:
      return state;
  }
}

export default reducer;