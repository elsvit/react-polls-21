import {put, takeEvery} from 'redux-saga/effects';

import {api} from '~/store';
import {IQuestion} from '~/types/IQuestions';
import {setLoaded, setLoading, setError} from '../common';
import {
  setQuestionsAction,
  setQuestionAction,
  getQuestionAction,
  IGetQuestionAction,
  ISaveVoteAction,
  QuestionsActions,
  IAddQuestionAction, addQuestionSuccessAction
} from './questions';

// Generator<PutEffect<ILoadingAction> | Promise<IQuestion[]> | PutEffect<ISetQuestionsAction> | PutEffect<ILoadedAction>, void, IQuestion[]>
export function* sagaGetQuestions() {
  const actionType = QuestionsActions.GET_QUESTIONS;

  try {
    yield put(setLoading({actionType}));

    const res: IQuestion[] = yield api.questionsApi.getQuestions();

    yield put(setQuestionsAction(res));
    yield put(setLoaded({actionType}));
  } catch (error) {
    const message = error.message || 'GET QUESTIONS ERROR';

    console.error(message);
    setError({
      actionType,
      message
    });
  }
}

export function* sagaGetQuestion({payload}: IGetQuestionAction) {
  const actionType = QuestionsActions.GET_QUESTION;

  try {
    yield put(setLoading({actionType}));

    const res: IQuestion = yield api.questionsApi.getQuestion(payload);

    yield put(setQuestionAction(res));
    yield put(setLoaded({actionType}));
  } catch (error) {
    const message = error.message || 'GET QUESTION ERROR';

    console.error(message);
    setError({
      actionType,
      message
    });
  }
}

export function* sagaAddQuestion({payload}: IAddQuestionAction) {
  const actionType = QuestionsActions.ADD_QUESTION;

  try {
    yield put(setLoading({actionType}));

    const res: IQuestion = yield api.questionsApi.addQuestion(payload);

    yield put(addQuestionSuccessAction(res));
    yield put(setLoaded({actionType}));
  } catch (error) {
    const message = error.message || 'GET QUESTION ERROR';

    console.error(message);
    setError({
      actionType,
      message
    });
  }
}

export function* sagaSaveAVote({payload}: ISaveVoteAction) {
  const actionType = QuestionsActions.SAVE_VOTE;

  try {
    yield put(setLoading({actionType}));

    yield api.questionsApi.saveVote(payload);

    const urlArr = payload.url?.split('/');
    const idx = urlArr.length - 3;

    if (idx > -1) {
      const id = urlArr[idx];

      yield put(getQuestionAction(id));
    }

    yield put(setLoaded({actionType}));
  } catch (error) {
    const message = error.message || 'SAVE VOTE ERROR';

    console.error(message);
    setError({
      actionType,
      message
    });
  }
}

export default function*(): Generator {
  yield takeEvery(QuestionsActions.GET_QUESTIONS, sagaGetQuestions);
  yield takeEvery(QuestionsActions.GET_QUESTION, sagaGetQuestion);
  yield takeEvery(QuestionsActions.SAVE_VOTE, sagaSaveAVote);
  yield takeEvery(QuestionsActions.ADD_QUESTION, sagaAddQuestion);
}