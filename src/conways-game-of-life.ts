import { Record, Set } from 'immutable';

interface CellBase {
    readonly x: number;
    readonly y: number;
}

const CellRecord = Record({
    x: 0,
    y: 0
});

const deltas = [
    { dx: -1, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: +1 },
    { dx: 0, dy: -1 },
    //  { dx:  0, dy:  0 },
    { dx: 0, dy: +1 },
    { dx: +1, dy: -1 },
    { dx: +1, dy: 0 },
    { dx: +1, dy: +1 }
];

export class Cell extends CellRecord implements CellBase {
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

interface GameBase {
    readonly cells: Set<Cell>;
}

const GameRecord = Record({
    cells: Set<Cell>(),
});

export class State extends GameRecord implements GameBase {
    readonly cells: Set<Cell>;

    constructor(props: GameBase) {
        super(props);
    }

    next(): State {
        const aliveCells = this.cells;

        const aliveInNext = aliveCells.flatMap(function (cell: Cell) {
            const neighbours = cell.neighbours();

            const neighboursInNext = neighbours.filter(function (neighbour: Cell) {
                return neighbour.aliveNeighbours(aliveCells) === 3;
            }).toSet();

            const aliveNeighbours = cell.aliveNeighbours(aliveCells);

            if (aliveNeighbours === 2 || aliveNeighbours === 3) {
                return neighboursInNext.add(cell);
            } else {
                return neighboursInNext;
            }
        }).toSet();

        return new State({ cells: aliveInNext });
    }
}