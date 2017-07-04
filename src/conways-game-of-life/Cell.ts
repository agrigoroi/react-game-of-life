import { Record, Set } from 'immutable';

const deltas = [
    { dx: -1, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: +1 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: +1 },
    { dx: +1, dy: -1 },
    { dx: +1, dy: 0 },
    { dx: +1, dy: +1 }
];

interface CellBase {
    readonly x: number;
    readonly y: number;
}

const CellRecord = Record({ x: 0, y: 0 });

export default class Cell extends CellRecord implements CellBase {
    readonly x: number;
    readonly y: number;

    constructor(props: CellBase) {
        super(props);
    }

    neighbours(): Set<Cell> {
        const neighbours = new Array<Cell>();
        for (let { dx, dy } of deltas) {
            neighbours.push(new Cell({ x: this.x + dx, y: this.y + dy }));
        }
        return Set(neighbours);
    }

    aliveNeighbours(aliveCells: Set<Cell>): number {
        return this.neighbours().count(function (neighbour: Cell) {
            return aliveCells.contains(neighbour);
        });
    }
}