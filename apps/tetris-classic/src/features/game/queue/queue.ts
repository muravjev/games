import type { Subslice } from 'utils/subslice/createSubslices';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Select, Thunk } from 'features/hooks';
import type { IBoardConfig } from '../board/boardConfig';
import type { IQueueConfig } from './queueConfig';
import type { Matrix } from 'utils/matrix';
import type { Figure } from 'features/game/game';

import { createSubslice } from 'utils/subslice/createSubslice';

import { prepareQueue } from './queueUtils';
import { createFigures } from './utils/createFigures';

export type QueueFigure = Figure & {
    cutted: Matrix;
};

type QueueState = {
    figures: QueueFigure[]; // -- all figures
    indexes: number[]; // -- all indexes
    pending: number[]; //  -- pending figures
};

const initialState: QueueState = {
    figures: [],
    indexes: [],
    pending: []
};

export const createQueueSubslice = createSubslice({
    name: 'queue',
    initialState,
    selectors: {
        select: state => state,
        selectNext: state => {
            const { figures, pending } = state;
            return figures[pending[pending.length - 1]];
        }
    },
    reducers: {
        configured: (state, action: PayloadAction<QueueState>) => action.payload,
        advanced: (state, action: PayloadAction<number[]>) => ({
            ...state,
            pending: action.payload
        })
    }
});

export const createQueue = (
    Subslice: Subslice<typeof createQueueSubslice>,
    BoardConfig: IBoardConfig,
    QueueConfig: IQueueConfig
) => {
    const { select, selectNext } = Subslice.selectors;
    const { configured, advanced } = Subslice.actions;

    const selectNextFigure: Select<Figure> = state => {
        const { figure, position } = selectNext(state);
        return { figure, position };
    };

    const selectNextCutted: Select<Matrix> = state => {
        return selectNext(state).cutted;
    };

    const configure: () => Thunk = () => (dispatch, getState) => {
        const configBoardWidth = BoardConfig.select(getState()).boardWidth;
        const configFigures = QueueConfig.select(getState()).figures;
        const figures = createFigures(configFigures, configBoardWidth);
        const indexes = figures.map((_, index) => index);
        const pending = prepareQueue(indexes, []);
        const queue = { figures, indexes, pending };
        dispatch(configured(queue));
    };

    const advance: () => Thunk = () => (dispatch, getState) => {
        const { indexes, pending } = select(getState());
        const nextPending = prepareQueue(indexes, pending);
        nextPending.pop();
        dispatch(advanced(nextPending));
    };

    return {
        selectNextFigure,
        selectNextCutted,
        configure,
        advance
    };
};

export type IQueue = ReturnType<typeof createQueue>;
