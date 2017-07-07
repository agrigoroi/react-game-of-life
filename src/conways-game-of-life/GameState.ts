import { Record, Set } from 'immutable';
import Cell from './Cell';

interface GameStateBase {
    readonly cells: Set<Cell>;
}

const GameStateRecord = Record({
    cells: Set<Cell>(),
});

export default class GameState extends GameStateRecord implements GameStateBase {
    readonly cells: Set<Cell>;

    constructor(props: GameStateBase) {
        super(props);
    }

    aliveNeighbours(cell: Cell): number {
        const board = this;
        return cell.neighbours()
            .count((neighbour: Cell) => board.cells.contains(neighbour));
    }

    next(): GameState {
        const board = this;

        const aliveInNext = board.cells.flatMap(function (cell: Cell) {
            const neighboursInNext = cell.neighbours()
                .filter((neighbour: Cell) => board.aliveNeighbours(neighbour) === 3)
                .toSet();

            const aliveNeighbours = board.aliveNeighbours(cell);

            if (aliveNeighbours === 2 || aliveNeighbours === 3) {
                return neighboursInNext.add(cell);
            } else {
                return neighboursInNext;
            }
        }).toSet();

        return new GameState({ cells: aliveInNext });
    }
}