import React, {ReactElement} from 'react';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';

import {IChoice} from '~/types/IQuestions';
import './selectChoice.scss';

interface ICountryRowProps {
  row: IChoice;
  totalVotes: number;
  selectedUrl?: Maybe<string>;
  onClick: (row: string) => void;
}

const SelectChoiceRow = ({row, totalVotes, selectedUrl, onClick}: ICountryRowProps): ReactElement => {
  const handleClick = () => {
    if (onClick && row.url) {
      onClick(row.url);
    }
  };

  const percent = `${Math.round((totalVotes ? row.votes / totalVotes : 0) * 10000) / 100}%`;

  return (
    <Grid container className="select-choice-row" onClick={handleClick}>
      <Grid item xs={12} sm={7}>
        {row.choice}
      </Grid>
      <Grid item xs={5} sm={2}>
        {row.votes}
      </Grid>
      <Grid item xs={5} sm={2}>
        {percent}
      </Grid>
      <Grid item xs={2} sm={1}>
        <Radio checked={selectedUrl === row.url}/>
      </Grid>
    </Grid>
  );
};

export default SelectChoiceRow;