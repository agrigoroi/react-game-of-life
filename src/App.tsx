import * as React from 'react';
import './App.css';
import State from './conways-game-of-life/Game';
import Cell from './conways-game-of-life/Cell';
import { Set } from 'immutable';
import GameComponent from './Game';

interface AppState {
  tickDuration: number;
  gameSize: number;
}

class App extends React.Component<{}, AppState> {
  componentWillMount() {
    this.setState({ tickDuration: 500, gameSize: 50 });
  }

  render() {
    const app = this;
    return (
      <div className="App">
        <div className="header">
          <div style={{ float: 'left' }}>
            <label>Game Size</label>
            <input
              type="number"
              value={app.state.gameSize}
              min={0}
              max={1000}
              onChange={function (event) {
                app.setState({ gameSize: +event.target.value });
              }}
            />
          </div>
          <div style={{ float: 'right' }}>
            <label>Speed</label>
            <input
              type="range"
              value={app.state.tickDuration}
              min={200}
              max={2000}
              onChange={function (event) {
                app.setState({ tickDuration: +event.target.value });
              }}
              step={50}
            />
          </div>
        </div>
        <GameComponent
          gameSize={app.state.gameSize}
          tickDuration={app.state.tickDuration}
          initialState={
            new State({
              cells: Set.of(
                new Cell({ x: 5, y: 5 }),
                new Cell({ x: 6, y: 5 }),
                new Cell({ x: 7, y: 5 }),
                new Cell({ x: 6, y: 6 })
              )
            })
          }
        />
      </div>
    );
  }
}

export default App;