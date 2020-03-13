// import packages
import React from "react";
import { Switch, Router, Route, Redirect } from "react-router-dom";

// import bootstrap for css styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./mainapp.css";

// import components
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";

export default function MainApp(props) {
  return (
    <div>
      <Header {...props} />
      <Router history={props.history}>
        <Switch location={props.location}>
          <Route exact path="/" component={() => <HomePage {...props} />} />
          <Route path="/login" component={() => <Login {...props} />} />
          <Route path="/signup" component={() => <Signup {...props} />} />
          <Route
            path="/profile/:name"
            component={() => <Profile {...props} />}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}
