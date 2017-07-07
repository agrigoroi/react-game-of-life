import * as React from 'react';
import Cell from './conways-game-of-life/Cell';
import BlackSquare from './BlackSquare';
import { Set } from 'immutable';

interface BoardProps {
    cells: Set<Cell>;
    size: number;
}

export default class BoardComponent extends React.Component<BoardProps, {}> {
    private divElement: HTMLDivElement | null;

    componentDidMount() {
      // this.setState({});
    }

    render() {
        const cellSize = this.cellSize();

        if (!cellSize) {
            return (
                <div
                    className="canvas"
                    ref={(divElement) => this.divElement = divElement}
                />
            );
        } else {
            return (
                <div
                    className="canvas"
                    ref={(divElement) => this.divElement = divElement}
                >{this.props.cells.map(function (cell: Cell) {
                    return (
                        <BlackSquare
                            key={cell.x + 'x' + cell.y}
                            size={cellSize}
                            top={cell.y * cellSize}
                            left={cell.x * cellSize}
                        />
                    );
                }).toArray()}
                </div>
            );
        }
    }

    private cellSize(): number | null {
        if (this.divElement != null) {
            if (this.divElement.clientHeight > this.divElement.clientWidth) {
                return this.divElement.clientWidth / this.props.size;
            } else {
                return this.divElement.clientHeight / this.props.size;
            }
        } else {
            return null;
        }
    }
}