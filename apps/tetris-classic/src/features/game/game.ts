import type { Select, Thunk } from 'features/hooks';
import type { EStage } from './runner/runner';
import type { Matrix } from 'utils/matrix';

export type Position = { x: number; y: number };

export type Figure = {
    figure: Matrix;
    position: Position;
};

export type GameBoardSize = {
    boardWidth: number;
    boardHeight: number;
};

export interface IGameBoardSize {
    selectBoardSize: Select<GameBoardSize>;
}

export interface IGameBoardMerge {
    selectMerge: Select<Matrix>;
}

export interface IGameStage {
    selectStage: Select<EStage>;
    toggleStage: () => Thunk;
}

export interface IGameActions {
    moveLeft: () => Thunk;
    moveRight: () => Thunk;
    rotateLeft: () => Thunk;
    rotateRight: () => Thunk;
    hardDrop: () => Thunk;
    softDropStart: () => Thunk;
    softDropEnd: () => Thunk;
}
