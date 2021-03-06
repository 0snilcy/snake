import React, { FC, memo } from 'react';
import { Cell } from '../Cell';
import './index.css';

interface Props {
  list: number[];
}

export const Row: FC<Props> = memo(({ list }) => {
  return (
    <div className="row">
      {list.map((type, id) => (
        <Cell type={type} key={id} />
      ))}
    </div>
  );
});
