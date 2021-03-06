import React, { FC, memo } from 'react';
import { useDebug } from '../../store';
import { CellType } from '../../types';
import './index.css';

interface Props {
  type: CellType;
}

const CellMap = ['', <div className="snake"></div>, '🥑'];

export const Cell: FC<Props> = memo(({ type }) => {
  const { debug } = useDebug();
  return <div className="cell">{debug ? type : CellMap[type]}</div>;
});
