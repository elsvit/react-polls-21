import React, {ReactElement} from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import BG_IMG from '~/assets/images/bg_map.gif';
import {IQuestion} from '~/types/IQuestions';
import QuestionCard from './QuestionCard';
import './questions.scss';

interface IRegionsViewProps {
  list: IQuestion[];
  onClick: (val: string) => void;
  onAddClick: () => void;
}

const QuestionsView = ({list, onClick, onAddClick}: IRegionsViewProps): ReactElement => {
  return (
    <div className="questions-wrapper">
      <div className="questions-bg" style={{backgroundImage: `url(${BG_IMG})`}}/>
      <div className="questions-header">
        <Typography variant="h5" gutterBottom>{'QUESTIONS'}</Typography>
        <Button className={'form-btn'} variant="contained" onClick={onAddClick}>
          Add
        </Button>
      </div>
      <Divider className="divider" variant="fullWidth"/>
      {list.map((value: IQuestion) => (
        <QuestionCard key={value.url} value={value} onClick={onClick} />
      ))}

    </div>
  );
};

export default QuestionsView;