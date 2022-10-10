import type { Subslice } from 'utils/subslice/createSubslices';

import { createSubslice } from 'utils/subslice/createSubslice';
import { figures } from 'config/game/figures';

const initialState = {
    figures
};

export type QueueConfig = typeof initialState;
export type QueueConfigFigure = typeof initialState['figures'][number];

export const createQueueConfigSubslice = createSubslice({
    name: 'queueConfig',
    initialState,
    selectors: {
        select: state => state
    }
});

export const createQueueConfig = (Subslice: Subslice<typeof createQueueConfigSubslice>) => {
    return Subslice.selectors;
};

export type IQueueConfig = ReturnType<typeof createQueueConfig>;
