import types from "./types";

export const setSearch = (payload) => {
  return {
    type: types.SET_SEARCH,
    payload,
  };
};
