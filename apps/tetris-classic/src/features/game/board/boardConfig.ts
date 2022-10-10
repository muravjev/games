import type { Subslice } from 'utils/subslice/createSubslices';

import { createSubslice } from 'utils/subslice/createSubslice';
import { gameConfig } from 'config/game/game';

const initialState = gameConfig.boardSize;

export const createBoardConfigSubslice = createSubslice({
    name: 'boardConfig',
    initialState,
    selectors: {
        select: state => state
    }
});

export function createBoardConfig(Subslice: Subslice<typeof createBoardConfigSubslice>) {
    return Subslice.selectors;
}

export type IBoardConfig = ReturnType<typeof createBoardConfig>;
