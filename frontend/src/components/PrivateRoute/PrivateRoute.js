import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, mainProps: props, ...rest }) => {
  const isAuthenticated = props.auth.isAuthenticated;
  return (
    <Route
      {...rest}
      // * this rest will only consist props passed in private route, i.e exact path to be used in Route Component
      render={(routeProps) => {
        // * we'll construct newProps, which will consist both route props and main-props of the complete application
        let newProps = {
          ...props,
          history: routeProps.history,
          location: routeProps.location,
          match: routeProps.match,
        };
        return isAuthenticated ? (
          <Component {...newProps} />
        ) : (
          // * now the new constructed props will be passed to component and can be handled in App.js file
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default PrivateRoute;
