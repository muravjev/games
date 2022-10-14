import type { Subslice } from '@muravjev/utils-redux-subslice';
import type { TState } from 'features/hooks';

import { declareSubslice } from '@muravjev/utils-redux-subslice';
import { gameConfig } from 'config/game/game';

const initialState = gameConfig.boardSize;

export const boardConfigOptions = declareSubslice({
    name: 'boardConfig',
    initialState,
    selectors: {
        select: state => state
    }
});

export function createBoardConfig(Subslice: Subslice<TState, typeof boardConfigOptions>) {
    return Subslice.selectors;
}

export type IBoardConfig = ReturnType<typeof createBoardConfig>;
