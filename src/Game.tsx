import * as React from 'react';
import GameState from './conways-game-of-life/GameState';
import Cell from './conways-game-of-life/Cell';
import BoardComponent from './Board';
import { Set } from 'immutable';
import RangeInput from './RangeInput';

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
                    <RangeInput
                        label="Game size"
                        value={component.state.size}
                        min={15}
                        max={2000}
                        onChange={function (newSize) {
                            component.setState({ size: newSize });
                        }}
                        step={50}
                    />
                    <RangeInput
                        label="Game Speed"
                        value={component.state.speed}
                        min={200}
                        max={2000}
                        onChange={function (speed) {
                            component.setState({ speed });
                        }}
                        step={50}
                    />
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