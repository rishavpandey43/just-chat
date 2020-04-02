// import packages
import React from "react";
import { Switch, Router, Route, Redirect } from "react-router-dom";

// import bootstrap for css styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

// import components
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/Profile/Profile";
import ChatBox from "./components/ChatBox/ChatBox";

export default function MainApp(props) {
  return (
    <div>
      <Header {...props} />
      <Router history={props.history}>
        <Switch location={props.location}>
          <Route exact path="/" component={() => <HomePage {...props} />} />
          <Route path="/login" component={() => <Login {...props} />} />
          <Route path="/signup" component={() => <Signup {...props} />} />
          <PrivateRoute
            exact
            path="/profile/:username"
            mainProps={{ ...props }} // * pass the main app props separately to handle it PrivateProps component
            component={props => <Profile {...props} />}
            // * The newly constructed props in PrivateRoute is then passed to protected components
          />
          <PrivateRoute
            exact
            path="/chat/:type/:name"
            mainProps={{ ...props }}
            component={props => <ChatBox {...props} />}
            // * The newly constructed props in PrivateRoute is then passed to protected components
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}
