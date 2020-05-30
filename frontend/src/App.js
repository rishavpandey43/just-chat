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

// import components
import SideBar from './components/SideBar/SideBar';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Profile from './components/Profile/Profile';
import Friends from './components/Friends/Friends';
import ChangePassword from './components/ChangePassword/ChangePassword';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';

import Flash from './components/Flash/Flash';

export default function MainApp(props) {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.getuserFetch();
    }
  }, []);
  return (
    <div style={{ position: 'relative' }}>
      <Flash />
      <div className="main-wrapper">
        <SideBar {...props} />
        <main
          className={`${
            props.auth.isAuthenticated ? 'sidebar-active' : 'sidebar-inactive'
          }`}
        >
          <Router>
            <Switch>
              <Route exact path="/" component={() => <HomePage {...props} />} />
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
