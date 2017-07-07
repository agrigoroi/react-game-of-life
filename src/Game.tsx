import * as React from 'react';
import GameState from './conways-game-of-life/GameState';
import Cell from './conways-game-of-life/Cell';
import BoardComponent from './Board';
import { Set } from 'immutable';

// interface GameProps {
//     initialState: GameState;
// }

interface GameComponentState {
    state: GameState;
    intervalId: number | null;
    size: number;
    speed: number;
}

export default class GameComponent extends React.Component<{}, GameComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            state: new GameState({
                cells: Set.of(
                    new Cell({ x: 5, y: 5 }),
                    new Cell({ x: 6, y: 5 }),
                    new Cell({ x: 7, y: 5 }),
                    new Cell({ x: 6, y: 6 })
                )
            }),
            size: 50,
            speed: 200,
            intervalId: null
        };
    }

    componentWillMount() {
        this.initInterval();
    }

    render() {
        const component = this;

        const size = component.state.size;
        const cells = this.state.state.cells.map(function (cell: Cell) {
            return component.centerCell(cell, size);
        }).filter(function (cell: Cell) {
            return cell.x >= 0 && cell.x <= size && cell.y >= 0 && cell.y <= size;
        }).toSet();

        return (
            <div className="game">
                <div className="header">
                    <div style={{ float: 'left' }}>
                        <label>Game Size</label>
                        <input
                            type="number"
                            value={this.state.size}
                            min={0}
                            max={1000}
                            onChange={function (event) {
                                component.setState({ size: +event.target.value });
                            }}
                        />
                    </div>
                    <div style={{ float: 'right' }}>
                        <label>Speed</label>
                        <input
                            type="range"
                            value={component.state.speed}
                            min={200}
                            max={2000}
                            onChange={function (event) {
                                component.setState({ speed: +event.target.value });
                            }}
                            step={50}
                        />
                    </div>
                </div>
                <BoardComponent size={size} cells={cells} />
            </div>
        );
    }

    componentWillUnmount() {
        this.clearInterval();
    }

    private initInterval() {
        const intervalId = window.setTimeout(this.timer.bind(this), this.state.speed);
        this.setState({ intervalId });
    }

    private clearInterval() {
        if (this.state.intervalId) {
            clearTimeout(this.state.intervalId);
        }
    }

    private centerCell(cell: Cell, gameSize: number) {
        return new Cell({
            x: cell.x + Math.floor(gameSize / 2),
            y: cell.y + Math.floor(gameSize / 2)
        });
    }

    private timer() {
        const nextState = this.state.state.next();
        this.setState({ state: nextState });
        this.initInterval();
    }
}