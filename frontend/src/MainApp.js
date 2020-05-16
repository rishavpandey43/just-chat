// * Import required modules/dependencies
import React, { useEffect } from "react";
import { Switch, Router, Route, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// * Import all store related stuffs
import * as AuthActions from "./redux/actions/creators/AuthActions";
import * as UserAction from "./redux/actions/creators/UserAction";

// * Import all screens/components
import SideBar from "./components/SideBar/SideBar";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/Profile/Profile";
import ChatBox from "./components/ChatBox/ChatBox";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import Flash from "./components/Flash/Flash";

// * Import utilites

// * Import all styling stuffs
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

function MainApp(props) {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.getuserFetch();
    }
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <Flash />
      <div className="main-wrapper">
        <SideBar />
        <main
          className={`${
            props.auth.isAuthenticated ? "sidebar-active" : "sidebar-inactive"
          }`}
        >
          <Router history={props.history}>
            <Switch location={props.location}>
              <Route exact path="/" component={() => <HomePage />} />
              <Route path="/login" component={() => <Login />} />
              <Route path="/signup" component={() => <Signup />} />
              <PrivateRoute
                exact
                path="/profile/:username"
                mainProps={{ ...props }} // * pass the main app props separately to handle it PrivateProps component
                component={() => <Profile />}
                // * The newly constructed props in PrivateRoute is then passed to protected components
              />
              <PrivateRoute
                exact
                path="/chat"
                mainProps={{ ...props }} // * pass the main app props separately to handle it PrivateProps component
                component={() => <ChatBox />}
                // * The newly constructed props in PrivateRoute is then passed to protected components
              />
              <PrivateRoute
                exact
                path="/update-profile"
                mainProps={{ ...props }} // * pass the main app props separately to handle it PrivateProps component
                component={() => <UpdateProfile />}
                // * The newly constructed props in PrivateRoute is then passed to protected components
              />
              <PrivateRoute
                exact
                path="/change-password"
                mainProps={{ ...props }}
                component={() => <ChangePassword />}
                // * The newly constructed props in PrivateRoute is then passed to protected components
              />
              <Redirect to="/" />
            </Switch>
          </Router>
        </main>
      </div>
    </div>
  );
}

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      ...AuthActions,
      ...UserAction,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainApp)
);
