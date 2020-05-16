import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as AuthActions from "./actions/creators/AuthActions";
import * as UserAction from "./actions/creators/UserAction";

import App from "../App";

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...AuthActions,
      ...UserAction,
    },
    dispatch
  );
}

const ReduxApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default ReduxApp;
