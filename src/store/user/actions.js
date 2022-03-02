import axios from "axios";
import types from "./types";
import { setLoading, setLoadingCards } from "../loading/actions";

export const setUser = (payload) => {
  return {
    type: types.SET_USER,
    payload,
  };
};
export const setRepositories = (payload) => {
  return {
    type: types.SET_REPOSITORIES,
    payload,
  };
};
export const setFollowers = (payload) => {
  return {
    type: types.SET_FOLLOWERS,
    payload,
  };
};
export const setFollowing = (payload) => {
  return {
    type: types.SET_FOLLOWING,
    payload,
  };
};

export const getUser = (username) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const user = await axios
      .get(`https://api.github.com/users/${username}`)
      .then((res) => res.data);
    dispatch(setUser(user));
  } catch (err) {
    alert(err?.response?.data?.message || err?.message);
  }
  dispatch(setLoading(false));
};

export const getRepositories = (username) => async (dispatch, getState) => {
  dispatch(setLoadingCards(true));
  try {
    const repositories = await axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.data);
    dispatch(setRepositories(repositories));
  } catch (err) {
    alert(err?.response?.data?.message || err?.message);
  }
  dispatch(setLoadingCards(false));
};

export const getFollowers = (username) => async (dispatch, getState) => {
  dispatch(setLoadingCards(true));
  try {
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
    dispatch(setFollowers(followers_items));
  } catch (err) {
    alert(err?.response?.data?.message || err?.message);
  }
  dispatch(setLoadingCards(false));
};

export const getFollowing = (username) => async (dispatch, getState) => {
  dispatch(setLoadingCards(true));
  try {
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
    dispatch(setFollowing(following_items));
  } catch (err) {
    alert(err?.response?.data?.message || err?.message);
  }
  dispatch(setLoadingCards(false));
};
