import type { Subslice } from 'utils/subslice/createSubslices';

import { createSubslice } from 'utils/subslice/createSubslice';
import { gameConfig } from 'config/game/game';

const initialState = {
    moveDelay: gameConfig.moveDelay,
    softDelay: gameConfig.softDelay,
    spawnDelay: gameConfig.spawnDelay,
    lockDelay: gameConfig.lockDelay,
    burnDelay: gameConfig.burnDelay
};

export const createFactorsConfigSubslice = createSubslice({
    name: 'factorsConfig',
    initialState,
    selectors: {
        select: state => state
    }
});

export const createFactorsConfig = (Subslice: Subslice<typeof createFactorsConfigSubslice>) => {
    return Subslice.selectors;
};

export type IFactorsConfig = ReturnType<typeof createFactorsConfig>;
