import React, {ReactElement} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {IQuestion} from '~/types/IQuestions';

interface IRegionRowProps {
  value: IQuestion;
  onClick: (val: string) => void;
}

const QuestionCard = ({value, onClick}: IRegionRowProps): ReactElement => {
  const choicesText = `${value.choices?.length || 0}(choices)`;
  const handleClick = () => {
    onClick(value.url);
  };

  return (
    <Paper
      className="select-question-card"
      onClick={handleClick}
      elevation={2}
    >
      <Typography variant="h6">
        {value.question}
      </Typography>
      <Typography variant="body2">
        {value.published_at}
      </Typography>
      <Typography variant="body1">
        {choicesText}
      </Typography>

    </Paper>
  );
};

export default QuestionCard;