import * as React from 'react';
import GameState from './conways-game-of-life/GameState';
import Cell from './conways-game-of-life/Cell';
import BoardComponent from './Board';
import { Set, Map } from 'immutable';
import RangeInput from './RangeInput';
import * as Select from 'react-select';
import 'react-select/dist/react-select.css';
import './Game.css'

interface GameComponentState {
    state: GameState;
    intervalId: number | null;
    size: number;
    speed: number;
}

const examples = Map({
    'Blinker': GameState.parse('0,1;1,1;2,1', ';'),
    'Beacon': GameState.parse('1,1;2,1;1,2;4,3;3,4;4,4', ';'),
    'Glider': GameState.parse('1,0;2,1;0,2;1,2;2,2', ';'),
    'Combination': GameState.parse('0,12;1,12;2,12;1,6;2,7;0,8;1,8;2,8', ';'),
    'Gosper Glider Gun': GameState.parse('5,1;5,2;6,1;6,2;5,11;6,11;7,11;' +
        '4,12;3,13;3,14;8,12;9,13;9,14;6,15;4,16;5,17;6,17;7,17;' +
        '6,18;8,16;3,21;4,21;5,21;3,22;4,22;5,22;2,23;6,23;1,25;' +
        // tslint:disable-next-line:align
        '2,25;6,25;7,25;3,35;4,35;3,36;4,36', ';')
});

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
                    <RangeInput
                        label="Game size"
                        value={component.state.size}
                        min={25}
                        max={1000}
                        onChange={(newSize) => component.setState({ size: newSize })}
                        step={1}
                    />
                    <RangeInput
                        label="Game Speed"
                        value={component.state.speed}
                        min={0}
                        max={2000}
                        onChange={(speed) => component.setState({ speed })}
                        step={50}
                    />
                    <Select
                        name="Example Select"
                        options={examples.map(function (_, label) {
                            return { value: label, label };
                        }).toArray()}
                        onChange={(ex) => {
                            if (ex instanceof Array) {
                                ex = ex[0];
                            }
                            if (ex && ex.label) {
                                component.setState({ state: examples.get(ex.label) });
                            }
                        }}
                    />
                </div>
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