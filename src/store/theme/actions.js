import types from "./types";

export const toggleDarkmode = (isDarkmode) => {
  const payload = isDarkmode ? "dark" : "light";
  localStorage.setItem("@themeMode", payload);
  return {
    type: types.TOGGLE_DARKMODE,
    payload,
  };
};
