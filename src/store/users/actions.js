import axios from "axios";
import types from "./types";
import { setLoading } from "../loading/actions";

export const setUsers = (payload) => {
  return {
    type: types.SET_USERS,
    payload,
  };
};

export const stateLikeUser = (payload) => {
  return {
    type: types.LIKE_USER,
    payload,
  };
};

export const getUsers = (username, page) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const per_page = 12;
    const result = await axios
      .get(
        `https://api.github.com/search/users?q=${username}+in:login&per_page=${per_page}&page=${page}`
      )
      .then((res) => res.data)
    const totalCount = result?.total_count || 0;
    const total = totalCount > 1000 ? 1000 : totalCount; // limit for 1000 for views on github
    const pagesLength = Math.ceil(total / per_page);
    const items = await Promise.all(
      result?.items?.map(async (item) => {
        const result = {
          id: item.id,
          username: item.login,
          avatar_url: item.avatar_url,
          followers: 0,
          following: 0,
        };
        const user = await axios
          .get(`https://api.github.com/users/${result.username}`)
          .then((res) => res.data)
          .catch(() => ({}));
        result.followers = user.followers || 0;
        result.following = user.following || 0;
        return result;
      }) || []
    );
    const users = {
      totalCount,
      pagesLength,
      items,
    };
    dispatch(setUsers(users));
  } catch (err) {
    alert(err?.response?.data?.message || err?.message);
  }
  dispatch(setLoading(false));
};

export const likeUser = (user) => (dispatch, getState) => {
  // return axios
  //   .post("http://localhost:8000/users", user)
  //   .then((result) => {
  //     dispatch(stateAddUser(user))
  //     return result;
  //   })
  //   .catch((err) => err);
};
