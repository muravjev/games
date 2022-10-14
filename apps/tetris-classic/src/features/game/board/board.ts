import type { Subslice } from '@muravjev/utils-redux-subslice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TState, Thunk } from 'features/hooks';
import type { IBoardConfig } from './boardConfig';
import type { Matrix } from 'utils/matrix';
import type { Figure } from 'features/game/game';

import { declareSubslice } from '@muravjev/utils-redux-subslice';
import { createMatrix } from 'utils/matrix';

import * as U from './boardUtils';

type BoardState = {
    basis: Matrix;
    merge: Matrix;
};

const initialState: BoardState = {
    basis: [[]],
    merge: [[]]
};

export const boardOptions = declareSubslice({
    name: 'board',
    initialState,
    selectors: {
        selectBasis: state => state.basis,
        selectMerge: state => state.merge
    },
    reducers: {
        configured(state, action: PayloadAction<Matrix>) {
            return { basis: action.payload, merge: action.payload };
        },
        boardMerged(state) {
            return { ...state, basis: state.merge };
        },
        figureMerged(state, action: PayloadAction<Matrix>) {
            return { ...state, merge: action.payload };
        },
        linesRemoved(state, action: PayloadAction<Matrix>) {
            const board = action.payload;
            return { basis: board, merge: board };
        }
    }
});

export const createBoard = (
    Subslice: Subslice<TState, typeof boardOptions>,
    BoardConfig: IBoardConfig
) => {
    const { selectBasis, selectMerge } = Subslice.selectors;
    const { configured, boardMerged, figureMerged, linesRemoved } = Subslice.actions;

    const configure: (board?: Matrix) => Thunk = board => (dispatch, getState) => {
        if (!board) {
            const config = BoardConfig.select(getState());
            const basis = createMatrix(config.boardWidth, config.boardHeight, 0);
            board = basis;
        }
        dispatch(configured(board));
    };

    const isValidFigurePosition: (figure: Figure) => Thunk<boolean> =
        figure => (dispatch, getState) => {
            const basis = selectBasis(getState());
            return U.isValidPosition(basis, figure);
        };

    const mergeFigure: (figure: Figure) => Thunk<boolean> = figure => (dispatch, getState) => {
        if (dispatch(isValidFigurePosition(figure))) {
            const basis = selectBasis(getState());
            const merge = U.mergeFigure(basis, figure);
            dispatch(figureMerged(merge));
            return true;
        }
        return false;
    };

    const getFigureDropDistance: (figure: Figure) => Thunk<number> =
        figure => (dispatch, getState) => {
            const basis = selectBasis(getState());
            return U.getFigureDropDistance(basis, figure);
        };

    const getCompletedLines: () => Thunk<number[]> = () => (dispatch, getState) => {
        const merge = selectMerge(getState());
        const lines = U.getCompletedLines(merge);
        return lines;
    };

    const removeLines: (lines: number[]) => Thunk = lines => (dispatch, getState) => {
        const merge = selectMerge(getState());
        const burned = U.removeLines(merge, lines);
        dispatch(linesRemoved(burned));
    };

    return {
        selectBasis,
        selectMerge,
        selectBoardSize: BoardConfig.select,
        configure,
        mergeBoard: boardMerged,
        isValidFigurePosition,
        mergeFigure,
        getFigureDropDistance,
        getCompletedLines,
        removeLines
    };
};

export type IBoard = ReturnType<typeof createBoard>;
