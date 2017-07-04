import { Record, Set } from 'immutable';
import Cell from './Cell';

interface GameBase {
    readonly cells: Set<Cell>;
}

const GameRecord = Record({
    cells: Set<Cell>(),
});

export default class State extends GameRecord implements GameBase {
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