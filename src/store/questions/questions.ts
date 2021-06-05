import {Reducer} from 'redux';

import {IChoice, IQuestion, INewQuestion} from '~/types/IQuestions';

// Actions
export enum QuestionsActions {
  GET_QUESTIONS = 'questions/GET_QUESTIONS',
  SET_QUESTIONS = 'questions/SET_QUESTIONS',
  GET_QUESTION = 'questions/GET_QUESTION',
  SET_QUESTION = 'questions/SET_QUESTION',
  SAVE_VOTE = 'questions/SAVE_VOTE',
  ADD_QUESTION = 'questions/ADD_QUESTION',
  ADD_QUESTION_SUCCESS = 'questions/ADD_QUESTION_SUCCESS',
  RESET = 'questions/RESET',
}

export type QuestionsLoadableT =
  | typeof QuestionsActions.GET_QUESTIONS
  | typeof QuestionsActions.GET_QUESTION
  | typeof QuestionsActions.SAVE_VOTE
  | typeof QuestionsActions.ADD_QUESTION;

export interface IGetQuestionsAction {
  type: typeof QuestionsActions.GET_QUESTIONS;
}

export interface ISetQuestionsAction {
  type: typeof QuestionsActions.SET_QUESTIONS;
  payload: IQuestion[];
}

export interface IGetQuestionAction {
  type: typeof QuestionsActions.GET_QUESTION;
  payload: string;
}

export interface ISetQuestionAction {
  type: typeof QuestionsActions.SET_QUESTION;
  payload: IQuestion;
}

export interface ISaveVoteAction {
  type: typeof QuestionsActions.SAVE_VOTE;
  payload: IChoice;
}

export interface IAddQuestionAction {
  type: typeof QuestionsActions.ADD_QUESTION;
  payload: INewQuestion
}

export interface IAddQuestionSuccessAction {
  type: typeof QuestionsActions.ADD_QUESTION_SUCCESS;
  payload: IQuestion;
}

export interface IResetQuestionsAction {
  type: typeof QuestionsActions.RESET;
}

type QuestionsActionsT =
  | IGetQuestionsAction
  | ISetQuestionsAction
  | IResetQuestionsAction
  | IGetQuestionAction
  | ISetQuestionAction
  | IAddQuestionAction
  | IAddQuestionSuccessAction
  | ISaveVoteAction;

export const getQuestionsAction = (): IGetQuestionsAction => ({type: QuestionsActions.GET_QUESTIONS});

export const setQuestionsAction = (payload: IQuestion[]): ISetQuestionsAction => ({
  type: QuestionsActions.SET_QUESTIONS,
  payload
});

export const getQuestionAction = (payload: string): IGetQuestionAction => ({
  type: QuestionsActions.GET_QUESTION,
  payload
});

export const resetQuestionsAction = (): IResetQuestionsAction => ({type: QuestionsActions.RESET});

export const setQuestionAction = (payload: IQuestion): ISetQuestionAction => ({
  type: QuestionsActions.SET_QUESTION,
  payload
});

export const saveVoteAction = (payload: IChoice): ISaveVoteAction => ({
  type: QuestionsActions.SAVE_VOTE,
  payload
});

export const addQuestionAction = (payload: INewQuestion): IAddQuestionAction => ({
  type: QuestionsActions.ADD_QUESTION,
  payload
});

export const addQuestionSuccessAction = (payload: IQuestion): IAddQuestionSuccessAction => ({
  type: QuestionsActions.ADD_QUESTION_SUCCESS,
  payload
});

// Reducer
export interface IQuestionsState {
  list: IQuestion[];
  current: Maybe<IQuestion>
}

export type QuestionsStateT = Readonly<IQuestionsState>;

const initialState: IQuestionsState = {
  list: [],
  current: null
};
const reducer: Reducer<QuestionsStateT> = (
  state: IQuestionsState = initialState,
  action: QuestionsActionsT,
) => {
  switch (action.type) {
    case QuestionsActions.SET_QUESTIONS:
      return {
        ...state,
        list: action.payload
      };

    case QuestionsActions.SET_QUESTION:
      return {
        ...state,
        current: action.payload
      };

    case QuestionsActions.RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;