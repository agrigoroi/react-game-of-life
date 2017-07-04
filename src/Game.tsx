import * as React from 'react';
import State from './conways-game-of-life/Game';
import Cell from './conways-game-of-life/Cell';
import BlackSquare from './BlackSquare';

interface GameState {
    state: State;
    intervalId: number;
}

interface GameProps {
    initialState: State;
    gameSize: number;
    tickDuration: number;
}

// Props: Grid size and game speed.

export default class GameComponent extends React.Component<GameProps, GameState> {
    divElement: HTMLDivElement | null;
    cellSize: number;

    componentWillReceiveProps(nextProps: GameProps) {
        if (this.props.tickDuration !== nextProps.tickDuration) {
            this.clearInterval();
            this.initInterval(nextProps.tickDuration);
        }
    }

    initInterval(tickDuration: number) {
        const intervalId: number = window.setInterval(
            (function (self: GameComponent) {
                return function () {
                    self.timer();
                };
            })(this),
            tickDuration);
        this.setState({ intervalId });
    }

    componentWillMount() {
        const props = this.props;

        this.initInterval(props.tickDuration);

        const state = new State({
            cells: this.props.initialState.cells.map(function (cell: Cell) {
                return new Cell({
                    x: cell.x + Math.floor(props.gameSize / 2),
                    y: cell.y + Math.floor(props.gameSize / 2)
                });
            }).toSet()
        });

        // TODO: should interval be stored as state or property of class
        this.setState({ state });
    }

    componentDidMount() {
        // trigger a rerender as we have the height now
        this.setState({ ...this.state, state: this.state.state });
        if (this.divElement != null) {
            if (this.divElement.clientHeight > this.divElement.clientWidth) {
                this.cellSize = this.divElement.clientWidth / this.props.gameSize;
            } else {
                this.cellSize = this.divElement.clientHeight / this.props.gameSize;
            }
        }
    }

    clearInterval() {
        clearInterval(this.state.intervalId);
    }

    componentWillUnmount() {
        this.clearInterval();
    }

    timer() {
        const nextState = this.state.state.next();
        this.setState({ ...this.state, state: nextState });
    }

    render() {
        if (this.divElement == null) {
            return (
                <div
                    className="canvas"
                    ref={(divElement) => this.divElement = divElement}
                />
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