import types from "./types";

export const likeUser = (payload) => {
  return {
    type: types.LIKE_USER,
    payload,
  };
};

export const dislikeUser = (payload) => {
  return {
    type: types.DISLIKE_USER,
    payload,
  };
};
