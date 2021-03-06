import React, { FC, memo } from 'react';
import { GameGrid } from '../../types';
import { Row } from '../Row';

interface Props {
  grid: GameGrid;
}

export const Grid: FC<Props> = memo(({ grid }) => {
  return (
    <div className="grid">
      {grid.map((list, id) => (
        <Row list={list} key={id} />
      ))}
    </div>
  );
});
