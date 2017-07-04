import * as React from 'react';
import './App.css';
import { State, Cell } from './conways-game-of-life';
import { Set } from 'immutable';

interface BlackSquareProps {
  top: number;
  left: number;
  height: number; // in pixels
  width: number;
}

class BlackSquare extends React.Component<BlackSquareProps, {}> {
  render() {
    const style = {
      background: 'black',
      position: 'absolute' as 'absolute',
      top: this.props.top,
      left: this.props.left,
      height: this.props.height,
      width: this.props.width
    };

    return <div style={style} />;
  }
}

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <div className="header">
          <p className="App-intro"> Hello </p>
        </div>
        <GameComponent />
      </div>
    );
  }
}

export default App;

interface GameState {
  state: State;
  intervalId: number;
}

// Props: Grid size and game speed.

class GameComponent extends React.Component<{}, GameState> {
  divElement: HTMLDivElement | null;
  readonly gameSize = 50;
  cellSize: number;

  componentWillMount() {
    const intervalId: number = setInterval(
      (function (self: GameComponent) {
        return function () {
          self.timer();
        };
      })(this),
      1000) as number;
    this.setState({ intervalId });

    const state = new State({
      cells: Set.of(
        new Cell({ x: 5, y: 5 }),
        new Cell({ x: 6, y: 5 }),
        new Cell({ x: 7, y: 5 }),
        new Cell({ x: 6, y: 6 })
      )
    });
    this.setState({ state });
  }

  componentDidMount() {
    // trigger a rerender as we have the height now
    this.setState({ state: this.state.state });
    if (this.divElement != null) {
      if (this.divElement.clientHeight > this.divElement.clientWidth) {
        this.cellSize = this.divElement.clientWidth / this.gameSize;
      } else {
        this.cellSize = this.divElement.clientHeight / this.gameSize;
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer() {
    const nextState = this.state.state.next();
    this.setState({ state: nextState });
  }

  render() {
    if (this.divElement == null) {
      return (
        <div
          className="canvas"
          ref={(divElement) => this.divElement = divElement}
        >
          <BlackSquare
            top={0}
            left={10}
            height={10}
            width={10}
          />
        </div>
      );
    } else {
      const cellSize = this.cellSize;
      const squares = this.state.state.cells
        .filter(function (cell: Cell) {
          return cell.x >= 0 && cell.y >= 0;
        }).map(function (cell: Cell) {
          return (
            <BlackSquare
              key={cell.x + 'x' + cell.y}
              height={cellSize}
              width={cellSize}
              top={cell.y * cellSize}
              left={cell.x * cellSize}
            />
          );
        }).toArray();
      return (
        <div
          className="canvas"
          ref={(divElement) => this.divElement = divElement}
        >
          {squares}
        </div>
      );
    }
  }
}