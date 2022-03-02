import types from "./types";

export const likeUser = (payload) => {
  return {
    type: types.LIKE_USER,
    payload,
  };
};
