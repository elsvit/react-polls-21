import {push, RouterAction} from 'connected-react-router';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {ROUTES} from '~/constants';
import QuestionsView from './QuestionsView';
import {IAppState} from '~/store';
import {IQuestion} from '~/types/IQuestions';
import {getQuestionsAction} from '~/store/questions';

interface IStateMap {
  list: IQuestion[];
  loading?: IBoolDict;
}

interface IDispatchMap {
  getQuestions: typeof getQuestionsAction;
  navTo: (route: string) => RouterAction;
}

type IQuestionsProps = IStateMap & IDispatchMap;

const Questions = ({list, getQuestions, navTo}: IQuestionsProps) => {
  useEffect(() => {
    getQuestions();
  }, []);

  const onCardClick = (url: string) => {
    const urlArr = url.split('/');
    const id = urlArr[urlArr.length - 1];

    navTo(`${ROUTES.QUESTIONS}/${id}`);
  };

  const onAddClick = () => {
    navTo(ROUTES.ADD);
  };

  return <QuestionsView list={list} onClick={onCardClick} onAddClick={onAddClick}/>;
};

const mapStateToProps = ({questions: {list}, common: {loading}}: IAppState) => ({
  list,
  loading
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getQuestions: getQuestionsAction,
      navTo: (route: string) => push(route)
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions);