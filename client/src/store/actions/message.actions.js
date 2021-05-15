//this action is unnecessary but it is to demonstrate scalability
import types from "../utils/actionNames";
import axios from "axios";

export const verifyMessage = () => async (dispatch, getState) => {
  await axios({
    method: "POST",
    url: "http://localhost:4000/users/auth",
  })
    .then((res) => {
      console.log(res.data.message);
      dispatch({
        type: types.SET_MESSAGE,
        payload: res.data.message,
      });
    })

    .catch((err) => console.log(err));
};
