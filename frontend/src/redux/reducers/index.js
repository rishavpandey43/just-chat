import { combineReducers } from "redux";

import authDetail from "./authDetail";
import userDetail from "./userDetail";

const rootReducer = combineReducers({
  authDetail,
  userDetail,
});

export default rootReducer;
