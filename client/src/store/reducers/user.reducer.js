import types from "../utils/actionNames";
import initialState from "../utils/userInitialState";

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      const { success, email, message } = action.payload;
      return {
        ...state,
        user: { loggedIn: success, email },
        message: message,
      };

    case types.REGISTER_RESULT:
      return {
        ...state,
        message: action.payload,
      };

    case types.LOGOUT:
      return {
        ...state,
        user: { loggedIn: false, email: null },
        message: action.payload,
      };

    case types.VERIFY_SESSION:
      return {
        ...state,
        user: { email: action.payload.email, loggedIn: action.payload.logged },
        message: action.payload.message,
      };

    default:
      return state;
  }
};

export default userReducer;
