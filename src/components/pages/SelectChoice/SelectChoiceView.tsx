import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {IQuestion} from '~/types/IQuestions';
import SelectChoiceRow from './SelectChoiceRow';
import './selectChoice.scss';
import Button from '@material-ui/core/Button';

interface IQuestionViewProps {
  item: Maybe<IQuestion>;
  selectedUrl: Maybe<string>
  totalVotes: number
  onClick: (val: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  // isLoading: boolean;
}

const SelectChoiceView = ({item, selectedUrl, totalVotes, onClick, onSubmit, onCancel}: IQuestionViewProps
) => {
  return (
    item?.choices ? (
      <div className="select-choice-wrapper">
        <Typography variant="h5" gutterBottom>{'Question Detail'}</Typography>
        <Typography variant="h6" gutterBottom>{`Question ${item?.question || ''}`}</Typography>
        <div className="select-choice-table">
          {item?.choices.map(val => (
            <SelectChoiceRow key={val.url} row={val} selectedUrl={selectedUrl} totalVotes={totalVotes} onClick={onClick}/>
          ))}
        </div>
        <Divider variant="fullWidth"/>
        <div className="select-choice-btns">
          <Button color="primary" className={'form-btn'} variant="contained" onClick={onSubmit}>
            Submit
          </Button>
          <Button className={'form-btn'} variant="contained" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    ) : (
      <Typography variant="h6" gutterBottom>{'Empty Question'}</Typography>
    )

  );
};

export default SelectChoiceView;