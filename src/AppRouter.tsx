/**
 * @fileOverview Routers
 */

import {ConnectedRouter} from 'connected-react-router';
import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import {history} from './store';
import {AddPage, QuestionsPage, SelectChoicePage} from './components/pages';
import DrawerWrapper from './components/blocks/DrawerWrapper';

import {ROUTES} from './constants';

const AppRouter = () => {
  return (
    <ConnectedRouter history={history}>
      <DrawerWrapper>
        <Switch>
          <Route exact path={`${ROUTES.QUESTIONS}/:id`} component={SelectChoicePage} />
          <Route exact path={ROUTES.QUESTIONS} component={QuestionsPage} />
          <Route exact path={`${ROUTES.ADD}`} component={AddPage} />
          <Redirect to={ROUTES.QUESTIONS} />
        </Switch>
      </DrawerWrapper>
      <NotificationContainer/>
    </ConnectedRouter>
  );
};

export default AppRouter;