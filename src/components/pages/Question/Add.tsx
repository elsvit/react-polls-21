import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {INewQuestion} from '~/types/IQuestions';
import {IAppState} from '~/store';
import {addQuestionAction, QuestionsActions} from '~/store/questions';
import QuestionForm from './QuestionForm';

const Add = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoaded: Maybe<boolean> = useSelector((state: IAppState) => state.common.loaded)[QuestionsActions.ADD_QUESTION];

  useEffect(() => {
    if (isLoaded) {
      goBack();
    }
  }, [isLoaded]);

  const goBack = () => {
    history.goBack();
  };

  const onSubmit = (val: INewQuestion) => {
    dispatch(addQuestionAction(val));
  };

  return (
    <QuestionForm
      title={'Add New Question'}
      onSubmit={onSubmit}
      onCancel={goBack}
    />
  );
};

export default Add;