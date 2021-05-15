//this reducer is unnecessary but it is to demonstrate scalability
import types from "../utils/actionNames";
import initialState from "../utils/messageInitialState";

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MESSAGE:
      return { ...state, message: action.payload };

    default:
      return state;
  }
};

export default messageReducer;
