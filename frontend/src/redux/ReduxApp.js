import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actionCreators from "./actions/actionCreators";

import App from "../App";

function mapStateToProps(state) {
  return {
    authDetail: state.authDetail,
    groupListDetail: state.groupListDetail
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const ReduxApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default ReduxApp;
