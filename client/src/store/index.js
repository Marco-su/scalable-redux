import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/user.reducer";
import messageReducer from "./reducers/message.reducer";

// combine reducer
const rootReducer = combineReducers({
  userStatus: userReducer,
  messages: messageReducer,
});

// store config
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

// export
export default generateStore;
