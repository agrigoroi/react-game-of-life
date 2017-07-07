import * as React from 'react';
import Cell from './conways-game-of-life/Cell';
import { Set } from 'immutable';
import './Board.css';

interface BoardProps {
    cells: Set<Cell>;
    size: number;
}

export default class BoardComponent extends React.Component<BoardProps, {}> {
    private canvas: HTMLCanvasElement | null;

    render() {
        return <canvas className="board" ref={canvas => this.canvas = canvas} />;
    }

    componentDidMount() {
        window.addEventListener('resize', this.onresize);
        this.onresize();
    }

    componentDidUpdate(prevProps: BoardProps, _: {}) {
        // if (this.props.size !== prevProps.size || !this.props.cells.equals(prevProps.cells)) {
            this.clearAndRedraw();
        // }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onresize);
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

        if (cellSize) {
            context.fillStyle = 'black';
            this.props.cells.forEach((cell: Cell) => {
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
}