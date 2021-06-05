/**
 * @fileOverview Routers
 */

import {ConnectedRouter} from 'connected-react-router';
import {History} from 'history';
import * as React from 'react';
import {Redirect, Route, RouteProps, Switch} from 'react-router-dom';

import {AddPage, QuestionsPage, SelectChoicePage} from './components/pages';
// import QuestionPage from './components/pages/SelectChoice';
import DrawerWrapper from './components/blocks/DrawerWrapper';

import {ROUTES} from './constants';
import {ReactElement} from 'react';

interface IOwnProps extends RouteProps {
  history: History;
}

type IRouterProps = IOwnProps;

const AppRouter = ({history}: IRouterProps): ReactElement => {
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
    </ConnectedRouter>
  );
};

export default AppRouter;

//          <Route exact path={`${ROUTES.QUESTION}/:id`} component={QuestionPage} />