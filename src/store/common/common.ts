import {Action, Reducer} from 'redux';

import {IError} from '~/types/IErrors';
import {QuestionsLoadableT} from '../questions';

// Actions
export const LOADING = 'LOADING';
export const LOADED = 'LOADED';
export const ERROR = 'ERROR';
export const RESET = 'common/RESET';
export const RESET_ALL = 'common/RESET_ALL';

export type ActionApiT =
  | QuestionsLoadableT
;

export interface IActionTypePayload {
  actionType: ActionApiT;
}

export interface IErrorPayload {
  actionType: ActionApiT;
  error?: IError;
  message?: string;
}

export interface ILoadingAction extends Action<typeof LOADING> {
  payload: IActionTypePayload;
}

export interface ILoadedAction extends Action<typeof LOADED> {
  payload: IActionTypePayload;
}

export interface IErrorAction extends Action<typeof ERROR> {
  payload: IErrorPayload;
}

export interface IResetAction extends Action<typeof RESET> {
  payload: IActionTypePayload;
}

export type IResetAllAction = Action<typeof RESET_ALL>

type CommonActionsT =
  | ILoadingAction
  | ILoadedAction
  | IErrorAction
  | IResetAction
  | IResetAllAction;

export const setLoading = ({actionType}: IActionTypePayload): ILoadingAction => ({
  payload: {actionType},
  type: LOADING
});

export const setLoaded = ({actionType}: IActionTypePayload): ILoadedAction => ({
  payload: {actionType},
  type: LOADED
});

export const setError = ({actionType, error}: IErrorPayload): IErrorAction => ({
  payload: {
    actionType,
    error
  },
  type: ERROR
});

export const resetCommonByTypeAction = ({actionType}: IActionTypePayload): IResetAction => ({
  payload: {actionType},
  type: RESET
});

export const resetAllCommonAction = (): IResetAllAction => ({type: RESET_ALL});

// Reducer
export interface ICommonState {
  error: IObjectDict<IError>;
  loaded: IBoolDict;
  loading: IBoolDict;
}

export type CommonStateT = Readonly<ICommonState>;

const initialState: CommonStateT = {
  error: {},
  loaded: {},
  loading: {}
};
const reducer: Reducer<CommonStateT> = (
  state: ICommonState = initialState,
  action: CommonActionsT,
) => {
  switch (action.type) {
    case LOADING:
      return {
        error: {
          ...state.error,
          [action.payload.actionType]: null
        },
        loaded: {
          ...state.loaded,
          [action.payload.actionType]: false
        },
        loading: {
          ...state.loading,
          [action.payload.actionType]: true
        }
      };

    case LOADED:
      return {
        ...state,
        loaded: {
          ...state.loaded,
          [action.payload.actionType]: true
        },
        loading: {
          ...state.loading,
          [action.payload.actionType]: false
        }
      };

    case ERROR: {
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.actionType]: action.payload.error
        },
        loaded: {
          ...state.loaded,
          [action.payload.actionType]: false
        },
        loading: {
          ...state.loading,
          [action.payload.actionType]: false
        }
      };
    }

    case RESET:
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.actionType]: null
        },
        loaded: {
          ...state.loaded,
          [action.payload.actionType]: null
        },
        loading: {
          ...state.loading,
          [action.payload.actionType]: null
        }
      };

    case RESET_ALL:
      return initialState;

    default:
      return state;
  }
};

export default reducer;