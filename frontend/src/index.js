import React from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import ReduxApp from './redux/ReduxApp';

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <ReduxApp />
    </HashRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
