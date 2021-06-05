/**
 * @fileOverview Root App component
 */

import React, {ReactElement} from 'react';
import {Provider} from 'react-redux';

import {history, store} from './store';
import AppRouter from './AppRouter';

import './app.scss';

const App = (): ReactElement => (
  <Provider store={store}>
    <div className="app">
      <AppRouter history={history}/>
    </div>
  </Provider>
);

export default App;