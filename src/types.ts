export enum AppState {
  Welcome,
  Action,
  Win,
  Lose,
}

export enum GameState {
  Wait,
  Action,
  Lose,
  Win,
}

export enum CellType {
  Empty,
  Snake,
  Fruit,
}

export type Point = number;
export type Row = CellType[];
export type Grid = Row[];
export type GameGrid = CellType[][];

export enum Direction {
  Up,
  Down,
  Right,
  Left,
}

export const KeyToDirection = {
  ArrowUp: Direction.Up,
  ArrowDown: Direction.Down,
  ArrowRight: Direction.Right,
  ArrowLeft: Direction.Left,
};

export const OppDireciton = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
  [Direction.Right]: Direction.Left,
};

export const Shift = {
  [Direction.Up]: -1,
  [Direction.Down]: 1,
  [Direction.Left]: -1,
  [Direction.Right]: 1,
};
