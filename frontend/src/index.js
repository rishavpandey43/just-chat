import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./redux/store";

import ReduxApp from "./redux/ReduxApp";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ReduxApp />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
