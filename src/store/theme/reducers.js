import types from "./types";

const initialState = {
  palette: {
    mode: localStorage.getItem("@themeMode") || "light",
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_DARKMODE:
      return {...state, palette: { ...(state?.palette || {}),  mode: action.payload } };
    default:
      return state;
  }
}

export default reducer;
