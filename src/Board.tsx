import * as React from 'react';
import Cell from './conways-game-of-life/Cell';
import BlackSquare from './BlackSquare';
import { Set } from 'immutable';
import './Board.css';

interface BoardProps {
    cells: Set<Cell>;
    size: number;
}

export default class BoardComponent extends React.Component<BoardProps, {}> {
    private divElement: HTMLDivElement | null;

    render() {
        const cellSize = this.cellSize();

        if (!cellSize) {
            return <div className="board" ref={(el) => this.divElement = el} />;
        } else {
            return (
                <div className="board" ref={(el) => this.divElement = el}>
                    {this.props.cells.map((cell: Cell) =>
                        (<BlackSquare
                            key={cell.x + 'x' + cell.y}
                            size={cellSize}
                            top={cell.y * cellSize}
                            left={cell.x * cellSize}
                        />)
                    ).toArray()}
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