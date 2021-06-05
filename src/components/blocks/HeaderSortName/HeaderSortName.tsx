import cn from 'classnames';
import React, {ReactElement} from 'react';

import SortArrows from '~/components/ui/SortArrows';
import {SortType} from '~/types/IBaseEntities';

import './headerSortName.scss';

interface IHeaderSortNameProps {
  title: string;
  changeSort: (title: string, active: SortType) => void;
  active?: SortType;
  className?: string;
}

const HeaderSortName = ({title, changeSort, active, className}: IHeaderSortNameProps): ReactElement => {
  const onArrowUpClick = () => {
    changeSort(title, SortType.DES);
  };

  const onArrowDownClick = () => {
    changeSort(title, SortType.ASC);
  };

  const upActive = active === SortType.ASC;
  const downActive = active === SortType.DES;

  return (
    <div className={cn('header-filter-name', className)}>
      <div className="header-filter-name-text">{title}</div>
      <div className="header-filter-name-text-arrows">
        <SortArrows
          upActive={upActive}
          downActive={downActive}
          onArrowUpClick={onArrowUpClick}
          onArrowDownClick={onArrowDownClick}
        />
      </div>
    </div>
  );
};

export default HeaderSortName;