import * as React from 'react';
import './App.css';
import { GameState, Cell } from './conways-game-of-life';
import { Set } from 'immutable';

const logo = require('./logo.svg');

class App extends React.Component<{}, {}> {
  state = new State({ cells: Set.of(new Cell({ x: 1, y: 1 }))});

  render() {
    console.log(this.state.next().toJS());
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro"> Hello </p>
      </div>
    );
  }
}

export default App;
