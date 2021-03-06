import React, { FC, useEffect, useState } from 'react';
import { GameController } from '../../controllers/game';
import { useStore } from '../../store';
import { GameGrid, GameState, KeyToDirection } from '../../types';
import { Controls } from '../Controls';
import { Grid } from '../Grid';

const getMessage = (state: GameState.Lose | GameState.Win) => {
  return {
    [GameState.Lose]: <h2>Game over: Lose 🙀</h2>,
    [GameState.Win]: <h2>Game over: Win 🎉</h2>,
  }[state];
};

export const Game: FC = () => {
  const [grid, updateGrid] = useState<GameGrid>([[]]);
  const [game, setGame] = useState<GameController | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.Wait);
  const { maxSpeed, minSpeed, gridSize } = useStore();

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (gameState === GameState.Wait) setGameState(GameState.Action);

      if (key in KeyToDirection && game) {
        game.move(KeyToDirection[key as keyof typeof KeyToDirection]);
        updateGrid(game.grid);
      }
    };

    if (gameState === GameState.Wait && !game) {
      const newGame = new GameController({
        updateState: setGameState,
        updateGrid,
        maxSpeed,
        minSpeed,
        gridSize,
      });
      setGame(newGame);
      updateGrid(newGame.grid);
    }

    if ([GameState.Wait, GameState.Action].includes(gameState)) {
      document.addEventListener('keydown', keyHandler);
    }

    return () => document.removeEventListener('keydown', keyHandler);
  }, [gameState, game, maxSpeed, minSpeed, gridSize]);

  return (
    <div>
      <h2>Snake</h2>
      <div className="row-container">
        {[GameState.Wait, GameState.Action].includes(gameState) ? (
          <Grid grid={grid} />
        ) : (
          getMessage(gameState as GameState.Lose | GameState.Win)
        )}
      </div>
      {game && (
        <Controls
          score={game.score}
          speed={game.currentSpeed}
          speedStep={game.speedStep}
        />
      )}
    </div>
  );
};
