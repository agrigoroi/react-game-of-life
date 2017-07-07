import * as React from 'react';
import Cell from './conways-game-of-life/Cell';
import { Set } from 'immutable';
import './Board.css';

interface BoardProps {
    cells: Set<Cell>;
    size: number;
    onClick: (cell: Cell) => void;
}

export default class BoardComponent extends React.Component<BoardProps, {}> {
    private canvas: HTMLCanvasElement | null;

    render() {
        const component = this;
        return (
            <canvas
                className="board"
                ref={canvas => this.canvas = canvas}
                onClick={(event) => component.onClick(event)}
            />
        );
    }

    componentDidMount() {
        window.addEventListener('resize', this.onresize);
        this.onresize();
    }

    componentDidUpdate(prevProps: BoardProps, _: {}) {
        this.clearAndRedraw();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onresize);
    }

    private onClick(event: React.MouseEvent<HTMLCanvasElement>) {
        const cellSize = this.cellSize();

        if (cellSize) {
            const x = Math.floor(event.clientX / cellSize);
            const y = Math.floor(event.clientY / cellSize);

            this.props.onClick(this.untraslateCell(x, y));
        }
    }

    private onresize() {
        if (this.canvas) {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
            this.clearAndRedraw();
        }
    }

    private clearAndRedraw() {
        if (this.canvas) {
            const context = this.canvas.getContext('2d');
            if (context) {
                context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.draw(context);
            }
        }
    }

    private draw(context: CanvasRenderingContext2D) {
        const cellSize = this.cellSize();
        const component = this;

        if (cellSize) {
            context.fillStyle = 'black';
            this.props.cells
                .map((cell: Cell) => component.translateCell(cell))
                .forEach((cell: Cell) => {
                    context.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
                });
        }
    }

    private cellSize(): number | null {
        if (this.canvas != null) {
            if (this.canvas.height > this.canvas.width) {
                return this.canvas.width / this.props.size;
            } else {
                return this.canvas.height / this.props.size;
            }
        } else {
            return null;
        }
    }

    private translateCell(cell: Cell) {
        return new Cell({
            x: cell.x + Math.floor(this.props.size / 2),
            y: cell.y + Math.floor(this.props.size / 2)
        });
    }

    private untraslateCell(x: number, y: number): Cell {
        return new Cell({
            x: x - Math.floor(this.props.size / 2),
            y: y - Math.floor(this.props.size / 2)
        });
    }
}