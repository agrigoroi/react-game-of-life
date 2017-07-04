import * as React from 'react';
import './App.css';
import State from './conways-game-of-life/Game';
import Cell from './conways-game-of-life/Cell';
import { Set } from 'immutable';
import GameComponent from './Game';

interface AppState {
  tickDuration: number;
}

class App extends React.Component<{}, AppState> {
  componentWillMount() {
    this.setState({ tickDuration: 500 });
  }

  render() {
    const app = this;
    return (
      <div className="App">
        <div className="header">
          <div style={{ float: 'right' }}>
            <label>Speed</label>
            <input
              type="range"
              value={app.state.tickDuration}
              min={200}
              max={2000}
              onChange={function (event) {
                const value = +event.target.value;
                app.setState({ tickDuration: value });
              }}
              step={50}
            />
          </div>
        </div>
        <GameComponent
          gameSize={50}
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