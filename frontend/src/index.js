import React from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from './redux/store';

import ReduxApp from './redux/ReduxApp';

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <ReduxApp />
    </HashRouter>
    <ToastContainer />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
