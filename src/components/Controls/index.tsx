import React, { FC } from 'react';
import { useStore } from '../../store';
import './index.css';

interface Props {
  speed: number;
  score: number;
  speedStep: number;
}

export const Controls: FC<Props> = ({ speed, score, speedStep }) => {
  const { debug, setDebug, minSpeed, maxSpeed, gridSize } = useStore();

  return (
    <section className="controls">
      <h2>State</h2>
      <p>
        <label>
          Debug:
          <input
            type="checkbox"
            checked={debug}
            onChange={() => setDebug((prev) => !prev)}
          />
        </label>
      </p>
      <p>Score: {score}</p>
      <p>Grid size: {gridSize}</p>
      <p>Cell length: {gridSize ** 2}</p>

      <dl>
        <dt>Speed</dt>
        <dd>current: {speed}ms</dd>
        <dd>step: {speedStep}ms</dd>
        <dd>min: {minSpeed}ms</dd>
        <dd>max: {maxSpeed}ms</dd>
      </dl>
    </section>
  );
};
