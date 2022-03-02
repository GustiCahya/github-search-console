import types from "./types";

export const setLoading = (payload) => {
  return {
    type: types.SET_LOADING,
    payload,
  };
};

export const setLoadingCards = (payload) => {
  return {
    type: types.SET_LOADING_CARDS,
    payload,
  };
};
