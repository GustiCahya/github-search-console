import axios from "axios";
import types from "./types";

export const setUsers = (payload) => {
  return {
    type: types.SET_USERS,
    payload,
  };
};

export const stateLikeUser = (payload) => {
  return {
    type: types.ADD_USER,
    payload,
  };
};

export const getUsers = () => async (dispatch, getState) => {
  // const users = await axios
  //   .get("http://localhost:8000/users")
  //   .then((res) => res.data)
  //   .catch((err) => alert(err.message));
  // dispatch(setUsers(users));
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
