import axios from "axios";
import types from "./types";
import { setLoading } from "../loading/actions";

export const setUser = (payload) => {
  return {
    type: types.SET_USER,
    payload,
  };
};

export const getUser = (username) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const user = await axios
      .get(`https://api.github.com/users/${username}`)
      .then((res) => res.data);
    const repositories = await axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.data);
    let followers_items = await axios
      .get(`https://api.github.com/users/${username}/followers`)
      .then((res) => res.data);
    followers_items = await Promise.all(
      followers_items?.map(async (item) => {
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
    let following_items = await axios
      .get(`https://api.github.com/users/${username}/following`)
      .then((res) => res.data);
    following_items = await Promise.all(
      following_items?.map(async (item) => {
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
    user.repositories = repositories;
    user.followers_items = followers_items;
    user.following_items = following_items;
    dispatch(setUser(user));
  } catch (err) {
    alert(err?.response?.data?.message || err?.message);
  }
  dispatch(setLoading(false));
};
