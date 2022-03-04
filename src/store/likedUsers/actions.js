import types from "./types";
import axios from "axios";
import { setLoading } from "../loading/actions";

export const setLikedUsers = (payload) => {
  return {
    type: types.SET_LIKED_USERS,
    payload,
  };
};

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

export const getLikedUsers = () => async (dispatch, getStates) => {
  dispatch(setLoading(true));
  try {
    const likedUsers = getStates().likedUsers;
    const items = await Promise.all(
      likedUsers?.map(async (item) => {
        const result = {
          id: item.id,
          login: item.login,
          avatar_url: item.avatar_url,
          followers: 0,
          following: 0,
        };
        const user = await axios
          .get(`https://api.github.com/users/${result.login}`)
          .then((res) => res.data)
          .catch(() => ({}));
        result.followers = user.followers || 0;
        result.following = user.following || 0;
        return result;
      }) || []
    );
    setLikedUsers(items);
  } catch (err) {
    alert(err?.response?.data?.message || err?.message);
  }
  dispatch(setLoading(false));
};
