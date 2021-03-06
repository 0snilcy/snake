import {
  CellType,
  Direction,
  Shift,
  Point,
  GameState,
  GameGrid,
  OppDireciton,
} from '../types';

const getArray = (size: number) =>
  Array(size)
    .fill('')
    .map(() => CellType.Empty);

const getRandomPosition = (n: number) => Math.floor(Math.random() * n);

interface GameControllerConstructor {
  updateState: (state: GameState) => void;
  updateGrid: (grid: GameGrid) => void;
  maxSpeed: number;
  minSpeed: number;
  gridSize: number;
}

export class GameController {
  private pointShift = 100;
  size: number;
  snake: Point[];
  fruits: Point[];
  lastDirection: Direction | null = null;
  state: GameState = GameState.Wait;
  score = 0;
  currentSpeed: number;
  maxSpeed: number;
  minSpeed: number;
  speedStep: number;
  timer: NodeJS.Timeout | null = null;

  changeState: (state: GameState) => void;
  updateGrid: () => void;

  constructor({
    updateState,
    updateGrid,
    minSpeed,
    maxSpeed,
    gridSize,
  }: GameControllerConstructor) {
    this.changeState = (state: GameState) => {
      updateState(state);
      this.state = state;
    };

    this.updateGrid = () => {
      updateGrid(this.grid);
    };

    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.currentSpeed = minSpeed;
    this.speedStep = Math.round((minSpeed - maxSpeed) / gridSize ** 2);
    this.size = gridSize;
    this.snake = [
      this.getPoint(Math.floor(this.size / 2), Math.floor(this.size / 2)),
    ];
    this.fruits = [this.getFruit()];
  }

  get grid(): GameGrid {
    const grid = getArray(this.size).map(() => getArray(this.size));

    if (![GameState.Wait, GameState.Action].includes(this.state)) return grid;

    for (const point of this.snake) {
      const pointArr = this.getArrFromPoint(point);
      grid[pointArr[0]][pointArr[1]] = CellType.Snake;
    }

    for (const point of this.fruits) {
      const pointArr = this.getArrFromPoint(point);
      grid[pointArr[0]][pointArr[1]] = CellType.Fruit;
    }

    return grid;
  }

  private getPoint(row: number, cell: number): Point {
    return row * this.pointShift + cell;
  }

  private getArrFromPoint(point: Point): number[] {
    return [
      Math.floor(point / this.pointShift),
      Math.round(((point / this.pointShift) % 1) * this.pointShift),
    ];
  }

  private checkGameStatus() {
    const head = this.getArrFromPoint(this.snake[0]);

    if (
      head[0] < 0 ||
      head[0] > this.size - 1 ||
      head[1] < 0 ||
      head[1] > this.size - 1
    ) {
      this.changeState(GameState.Lose);
    }
  }

  private shift(direction: Direction) {
    let next = this.snake[0];

    if (direction === Direction.Up || direction === Direction.Down) {
      next += Shift[direction] * this.pointShift;
    } else if (direction === Direction.Left || direction === Direction.Right) {
      next += Shift[direction];
    }

    if (this.snake.includes(next)) {
      this.changeState(GameState.Lose);
      return;
    }

    this.snake.unshift(next);

    const fruitsLength = this.fruits.length;
    this.fruits = this.fruits.filter((fruit) => fruit !== next);
    if (fruitsLength === this.fruits.length) {
      this.snake.pop();
    } else {
      if (this.snake.length === this.size ** 2) {
        return this.changeState(GameState.Win);
      }
      this.score += 1;
      this.currentSpeed =
        this.minSpeed - (this.snake.length - 1) * this.speedStep;
      this.fruits.push(this.getFruit());
    }

    this.lastDirection = direction;
    this.checkGameStatus();
  }

  private setTimer(direction: Direction) {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.shift(direction);
      this.updateGrid();

      if ([GameState.Wait, GameState.Action].includes(this.state))
        this.setTimer(direction);
    }, 200);
  }

  private getFruit() {
    let point;

    do {
      point = this.getPoint(
        getRandomPosition(this.size),
        getRandomPosition(this.size)
      );
    } while (~this.snake.indexOf(point));

    return point;
  }

  move(direction: Direction) {
    if (
      [GameState.Wait, GameState.Action].includes(this.state) &&
      this.lastDirection &&
      (direction === this.lastDirection ||
        direction === OppDireciton[this.lastDirection])
    )
      return;

    this.shift(direction);
    this.setTimer(direction);
  }
}
