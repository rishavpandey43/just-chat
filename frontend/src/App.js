import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actionCreators from "./redux/actions/actionCreators";

import MainApp from "./MainApp";

function mapStateToProps(state) {
  return {
    user: state.user,
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainApp));

export default App;
