import * as React from 'react';
import GameState from './conways-game-of-life/GameState';
import Cell from './conways-game-of-life/Cell';
import BoardComponent from './Board';
import { Set } from 'immutable';
import RangeInput from './RangeInput';
import 'react-select/dist/react-select.css';
import './Game.css';
import ExampleSelect from './ExampleSelect';
import SpeedSelect from './SpeedSelect';

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
            size: 100,
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
        const cells = this.state.state.cells
            .map((cell: Cell) => component.centerCell(cell, size))
            .filter((cell: Cell) => cell.x >= 0 && cell.x <= size && cell.y >= 0 && cell.y <= size)
            .toSet();

        return (
            <div className="game">
                <BoardComponent size={size} cells={cells} />
                <div className="controls">
                    <div>
                        <RangeInput
                            label="Game Size"
                            value={component.state.size}
                            min={25}
                            max={1000}
                            onChange={(newSize) => component.setState({ size: newSize })}
                            step={1}
                        />
                    </div>
                    <SpeedSelect
                        isRunning={this.state.intervalId !== null}
                        onPause={() => component.clearInterval()}
                        onResume={() => component.initInterval() }
                        speed={this.state.speed}
                        onSpeedChange={(speed) => this.setState({ speed })}
                    />
                    <ExampleSelect onChange={(state) => component.setState({ state })} />
                </div>
            </div>
        );
    }

    componentDidUpdate(_: {}, prevState: GameComponentState) {
        if (this.state.intervalId && this.state.speed !== prevState.speed) {
            this.clearInterval();
            this.initInterval();
        }
    }

    componentWillUnmount() {
        this.clearInterval();
    }

    private initInterval() {
        const intervalId = window.setInterval(this.timer.bind(this), this.state.speed);
        this.setState({ intervalId });
    }

    private clearInterval() {
        if (this.state.intervalId) {
            window.clearInterval(this.state.intervalId);
            this.setState({ intervalId: null });
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
    }
}