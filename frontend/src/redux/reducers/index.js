import { combineReducers } from "redux";

import authDetail from "./authDetail";
import groupListDetail from "./groupListDetail";

const rootReducer = combineReducers({
  authDetail,
  groupListDetail
});

export default rootReducer;
