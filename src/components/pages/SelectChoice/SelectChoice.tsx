import {push, RouterAction} from 'connected-react-router';
import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router';
import {bindActionCreators, Dispatch} from 'redux';

import {ROUTES} from '~/constants';
import {IAppState} from '~/store';
import {getQuestionAction, saveVoteAction} from '~/store/questions';
import {IQuestion} from '~/types/IQuestions';

import './selectChoice.scss';
import SelectChoiceView from './SelectChoiceView';

interface IStateMap {
  current: Maybe<IQuestion>;
  loading?: IBoolDict;
}

interface IDispatchMap {
  getQuestion: typeof getQuestionAction;
  saveVote: typeof saveVoteAction;
  navTo: (route: string) => RouterAction;
}

type ISelectChoiceProps = IStateMap & IDispatchMap & RouteComponentProps<void & { id: string }>;

const SelectChoice = ({current, match, navTo, getQuestion, saveVote}: ISelectChoiceProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const id = match?.params?.id;
  const [selectedUrl, setSelectedUri] = useState<Maybe<string>>(null);

  useEffect(() => {
    if (id === undefined) {
      navTo(ROUTES.QUESTIONS);
    } else {
      getQuestion(id);
    }
  }, []);

  const onClick = (val: string) => {
    if (val !== selectedUrl) {
      setSelectedUri(val);
    }
  };

  const onCancel = () => {
    navTo(ROUTES.QUESTIONS);
  };

  const onSubmit = () => {
    if (selectedUrl) {
      const choice = current?.choices.find(val => val.url === selectedUrl);

      if (choice) {
        saveVote(choice);
      }
    }
  };

  // const isLoading = !!loading[QuestionsActions.GET_QUESTION];
  const totalVotes = current?.choices?.reduce((a, b) => a + b.votes, 0) || 0 ;

  return (
    <Fragment>
      <SelectChoiceView
        item={current}
        selectedUrl={selectedUrl}
        totalVotes={totalVotes}
        onClick={onClick}
        onSubmit={onSubmit}
        onCancel={onCancel}
        // isLoading={isLoading}
      />
    </Fragment>
  );
};

const mapStateToProps = ({questions: {current}, common: {loading}}: IAppState) => ({
  current,
  loading
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getQuestion: getQuestionAction,
      saveVote: saveVoteAction,
      navTo: (route: string) => push(route)
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectChoice),
);