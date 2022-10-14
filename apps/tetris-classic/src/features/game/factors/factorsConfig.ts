import type { Subslice } from '@muravjev/utils-redux-subslice';
import type { TState } from 'features/hooks';

import { declareSubslice } from '@muravjev/utils-redux-subslice';
import { gameConfig } from 'config/game/game';

const initialState = {
    moveDelay: gameConfig.moveDelay,
    softDelay: gameConfig.softDelay,
    spawnDelay: gameConfig.spawnDelay,
    lockDelay: gameConfig.lockDelay,
    burnDelay: gameConfig.burnDelay
};

export const factorsConfigOptions = declareSubslice({
    name: 'factorsConfig',
    initialState,
    selectors: {
        select: state => state
    }
});

export const createFactorsConfig = (Subslice: Subslice<TState, typeof factorsConfigOptions>) => {
    return Subslice.selectors;
};

export type IFactorsConfig = ReturnType<typeof createFactorsConfig>;
