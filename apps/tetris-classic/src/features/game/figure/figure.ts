import type { Subslice } from '@muravjev/utils-redux-subslice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TState, Thunk } from 'features/hooks';
import type { Figure } from 'features/game/game';

import { declareSubslice } from '@muravjev/utils-redux-subslice';
import { rotateMatrix } from 'utils/matrix';

const initialState: Figure | null = null as unknown as Figure;

const updated = (figure: Figure, action: PayloadAction<Figure>) => action.payload;

export const figureOptions = declareSubslice({
    name: 'figure',
    initialState,
    selectors: {
        select: state => state
    },
    reducers: {
        spawned: updated,
        moved: updated,
        rotated: updated
    }
});

export const createFigure = (Subslice: Subslice<TState, typeof figureOptions>) => {
    const { select } = Subslice.selectors;
    const { spawned, moved, rotated } = Subslice.actions;

    const moveDx: (dx: number) => Thunk<Figure> = dx => (dispatch, getState) => {
        const { figure, position } = select(getState());
        const { x, y } = position;
        return { figure, position: { x: x + dx, y } };
    };

    const moveDy: (dy: number) => Thunk<Figure> = dy => (dispatch, getState) => {
        const { figure, position } = select(getState());
        const { x, y } = position;
        return { figure, position: { x, y: y + dy } };
    };

    const rotate: (clockwise: boolean) => Thunk<Figure> = clockwise => (dispatch, getState) => {
        const { figure, position } = select(getState());
        const rotated = rotateMatrix(figure, clockwise);
        return { figure: rotated, position };
    };

    return {
        select,
        moveDx,
        moveDy,
        rotate,
        spawned,
        moved,
        rotated
    };
};

export type IFigure = ReturnType<typeof createFigure>;
