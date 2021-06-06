/**
 * @fileOverview Root App component
 */

import React, {ReactElement} from 'react';
import {Provider} from 'react-redux';

import {store} from './store';
import AppRouter from './AppRouter';

import './app.scss';

const App = (): ReactElement => (
  <Provider store={store}>
    <div className="app">
      <AppRouter />
    </div>
  </Provider>
);

export default App;