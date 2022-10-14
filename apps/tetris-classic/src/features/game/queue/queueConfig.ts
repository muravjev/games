import type { Subslice } from '@muravjev/utils-redux-subslice';
import type { TState } from 'features/hooks';

import { declareSubslice } from '@muravjev/utils-redux-subslice';
import { figures } from 'config/game/figures';

const initialState = {
    figures
};

export type QueueConfig = typeof initialState;
export type QueueConfigFigure = typeof initialState['figures'][number];

export const queueConfigOptions = declareSubslice({
    name: 'queueConfig',
    initialState,
    selectors: {
        select: state => state
    }
});

export const createQueueConfig = (Subslice: Subslice<TState, typeof queueConfigOptions>) => {
    return Subslice.selectors;
};

export type IQueueConfig = ReturnType<typeof createQueueConfig>;
