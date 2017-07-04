import * as React from 'react';
import State from './conways-game-of-life/Game';
import Cell from './conways-game-of-life/Cell';
import BlackSquare from './BlackSquare';

interface GameState {
    state: State;
    intervalId: number;
    cellSize: number;
}

interface GameProps {
    initialState: State;
    gameSize: number;
    tickDuration: number;
}

// Props: Grid size and game speed.

export default class GameComponent extends React.Component<GameProps, GameState> {
    divElement: HTMLDivElement | null;

    componentWillReceiveProps(nextProps: GameProps) {
        if (this.props.tickDuration !== nextProps.tickDuration) {
            this.clearInterval();
            this.initInterval(nextProps.tickDuration);
        }
        if (this.props.gameSize !== nextProps.gameSize) {
            this.computeCellSize(nextProps.gameSize);
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

        // TODO: should interval be stored as state or property of class
        this.setState({ state: this.props.initialState });
    }

    centerCell(cell: Cell, gameSize: number) {
        return new Cell({
            x: cell.x + Math.floor(gameSize / 2),
            y: cell.y + Math.floor(gameSize / 2)
        });
    }

    componentDidMount() {
        // trigger a rerender as we have the height now
        this.setState({ state: this.state.state });
        this.computeCellSize(this.props.gameSize);
    }

    computeCellSize(gameSize: number) {
        if (this.divElement != null) {
            if (this.divElement.clientHeight > this.divElement.clientWidth) {
                this.setState({ cellSize: this.divElement.clientWidth / gameSize });
            } else {
                this.setState({ cellSize: this.divElement.clientHeight / gameSize });
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
            const cellSize = this.state.cellSize;
            const component = this;
            const squares = this.state.state.cells
                .map(function (cell: Cell) {
                    return component.centerCell(cell, component.props.gameSize);
                }).filter(function (cell: Cell) {
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