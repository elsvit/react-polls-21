import {connectRouter, routerMiddleware, RouterState} from 'connected-react-router';
import {createBrowserHistory, History} from 'history';
import {applyMiddleware, combineReducers, createStore, Store, CombinedState, AnyAction, Dispatch} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {BASE_URL} from '~/constants/config';

import {initApiServices} from '~/services/api';
import common, {CommonStateT} from './common';
import questions, {QuestionsStateT} from './questions';
import sagas from './sagas';

export interface IAppState {
  questions: QuestionsStateT;
  common: CommonStateT;
  router: RouterState;
}

export const api = initApiServices(BASE_URL);

const history: History = createBrowserHistory();
const reducers = combineReducers<IAppState>({
  questions,
  common,
  router: connectRouter(history)
});
const sagaMiddleware = createSagaMiddleware();

type IReduxStore = Store<CombinedState<IAppState>, AnyAction> & { dispatch: Dispatch; }

const store: IReduxStore = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagas.forEach((saga) => sagaMiddleware.run(saga));

export {store, history};