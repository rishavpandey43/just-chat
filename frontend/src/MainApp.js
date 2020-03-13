// import packages
import React from "react";
import { Switch, Router, Route, Redirect } from "react-router-dom";

// import components
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Header from "./components/Header/Header";

export default function MainApp(props) {
  return (
    <Router history={props.history}>
      <Header {...props} />
      <Switch location={props.location}>
        <Route exact path="/" component={() => <HomePage {...props} />} />
        <Route path="/login" component={() => <Login {...props} />} />
        <Route path="/signup" component={() => <Signup {...props} />} />
        <Redirect to="/home" />
      </Switch>
    </Router>
  );
}
