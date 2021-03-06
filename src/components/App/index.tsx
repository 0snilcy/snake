import React, { useState } from 'react';
import './index.css';

import { Game } from '../Game';
import { useStore } from '../../store';

export const App = () => {
  const { gridSize, setGridSize } = useStore();
  const [size, setSize] = useState(gridSize);
  const [ready, setReady] = useState(false);

  return (
    <section className="app">
      {ready ? (
        <Game />
      ) : (
        <>
          <h2>Welcome</h2>
          <p>
            Grid size: {size}x{size}
          </p>
          <input
            type="range"
            min="3"
            max="27"
            step="2"
            defaultValue={size}
            onChange={({ target }) => {
              setSize(+target.value);
            }}
          />
          <button
            type="button"
            onClick={() => {
              setGridSize(size);
              setReady(true);
            }}
          >
            Start
          </button>
        </>
      )}
    </section>
  );
};
