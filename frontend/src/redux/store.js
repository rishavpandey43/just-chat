import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./reducers/index";

const defaultStore = {
  user: {
    userName: "johndoe",
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com"
  },
  messages: []
};

const store = createStore(
  rootReducer,
  defaultStore,
  applyMiddleware(thunk, logger)
);

export default store;
