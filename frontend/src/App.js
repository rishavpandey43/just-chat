// import packages
import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// import bootstrap for css styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import 'react-toastify/dist/ReactToastify.css';

// import components
import SideBar from './components/SideBar/SideBar';
import HomePage from './screens/HomePage/HomePage';
import ActivateAccount from './screens/ActivateAccount/ActivateAccount';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Profile from './screens/Profile/Profile';
import Friends from './screens/Friends/Friends';
import ChangePassword from './screens/ChangePassword/ChangePassword';
import UpdateProfile from './screens/UpdateProfile/UpdateProfile';

import Loading from './components/Loading/Loading';

export default function MainApp(props) {
  let auth = props.auth;
  let getUserFetch = props.getUserFetch;
  useEffect(() => {
    if (auth.isAuthenticated) {
      getUserFetch();
    }
  }, [auth, getUserFetch]);
  return props.user.isFetching ? (
    <div className="loading-wrapper d-flex justify-content-center align-items-center">
      <div className="loader-error-wrapper">
        <Loading isTrue={props.user.isFetching}></Loading>
      </div>
    </div>
  ) : props.user.errMessage ? (
    <div className="main-wrapper-error">
      <img
        src={require('./assets/images/common_error.png')}
        alt="not found"
        width="100%"
      />
      <h3 className="text-center">{props.user.errMessage}</h3>
      <button
        className="btn main-btn err-btn"
        onClick={() => {
          props.getUserFetch();
        }}
      >
        Retry
      </button>
    </div>
  ) : (
    <div style={{ position: 'relative' }}>
      <div className="main-wrapper">
        <SideBar {...props} />
        <main
          className={`${
            props.auth.isAuthenticated ? 'sidebar-active' : 'sidebar-inactive'
          }`}
        >
          <Router>
            <Switch location={props.location}>
              <Route exact path="/" component={() => <HomePage {...props} />} />
              <Route
                path="/user/activate-account/:token"
                mainProps={{ ...props }}
                component={(props) => <ActivateAccount {...props} />}
              />
              <Route path="/login" component={() => <Login {...props} />} />
              <Route path="/signup" component={() => <Signup {...props} />} />
              <PrivateRoute
                exact
                path="/profile/:username"
                mainProps={{ ...props }} // * pass the main app props separately to handle it PrivateProps component
                component={(props) => <Profile {...props} />}
                // * The newly constructed props in PrivateRoute is then passed to protected components
              />
              <PrivateRoute
                exact
                path="/friends"
                mainProps={{ ...props }} // * pass the main app props separately to handle it PrivateProps component
                component={(props) => <Friends {...props} />}
                // * The newly constructed props in PrivateRoute is then passed to protected components
              />
              <PrivateRoute
                exact
                path="/change-password"
                mainProps={{ ...props }}
                component={(props) => <ChangePassword {...props} />}
                // * The newly constructed props in PrivateRoute is then passed to protected components
              />
              <PrivateRoute
                exact
                path="/update-profile"
                mainProps={{ ...props }} // * pass the main app props separately to handle it PrivateProps component
                component={(props) => <UpdateProfile {...props} />}
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
