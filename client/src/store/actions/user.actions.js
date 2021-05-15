import axios from "axios";
import types from "../utils/actionNames";

// login
export const login = (data) => async (dispatch, getState) => {
  await axios({
    url: "http://localhost:4000/users/login",
    method: "POST",
    withCredentials: true,
    data,
  })
    .then((res) => {
      if (!res.data.info.email) res.data.info.email = null;
      res.data.info.success = res.data.success;

      dispatch({
        type: types.LOGIN_USER,
        payload: res.data.info,
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

// register
export const register = (data) => async (dispatch, getState) => {
  await axios({
    url: "http://localhost:4000/users",
    method: "POST",
    withCredentials: true,
    data,
  })
    .then((res) => {
      dispatch({
        type: types.REGISTER_RESULT,
        payload: res.data.message,
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

export const logout = () => async (dispatch, getState) => {
  await axios({
    method: "POST",
    url: "http://localhost:4000/users/logout",
    withCredentials: true,
  })
    .then((res) => {
      dispatch({
        type: types.LOGOUT,
        payload: res.data.message,
      });
    })
    .catch((err) => console.log(err));
};

// Verify Session
export const verifySession = () => async (dispatch, getState) => {
  await axios({
    method: "POST",
    url: "http://localhost:4000/users/auth",
    withCredentials: true,
  })
    .then((res) => {
      dispatch({
        type: types.VERIFY_SESSION,
        payload: res.data,
      });
    })

    .catch((err) => console.log(err));
};
