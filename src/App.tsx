import * as React from 'react';
import './App.css';
import State from './conways-game-of-life/Game';
import Cell from './conways-game-of-life/Cell';
import { Set } from 'immutable';
import GameComponent from './Game';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <div className="header">
          <p className="App-intro"> Hello </p>
        </div>
        <GameComponent
          gameSize={50}
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