import cn from 'classnames';
import React, {ReactElement} from 'react';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

import './sortArrows.scss';

interface IFilterArrowsProps {
  upActive: boolean;
  downActive: boolean;
  onArrowUpClick: () => void;
  onArrowDownClick: () => void;
  className?: string;
}

const SortArrows = ({upActive, downActive, onArrowUpClick, onArrowDownClick, className}: IFilterArrowsProps): ReactElement => {
  const upColor = upActive ? 'primary' : 'disabled';
  const downColor = downActive ? 'primary' : 'disabled';

  return (
    <div className={cn('sort-arrows', className)}>
      <div className="sort-arrow">
        <ArrowDownward color={upColor} onClick={onArrowDownClick}/>
        <ArrowUpward color={downColor} onClick={onArrowUpClick}/>
      </div>
    </div>
  );
};

export default SortArrows;