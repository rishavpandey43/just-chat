import { combineReducers } from "redux";

import user from "./user";
import messages from "./messages";

const rootReducer = combineReducers({
  user,
  messages
});

export default rootReducer;
