import type { Subslice } from 'utils/subslice/createSubslices';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Dispatch } from 'features/hooks';
import type { ESounds } from 'config/sounds';

import { createSubslice } from 'utils/subslice/createSubslice';

export type SoundsState = {
    id?: ESounds;
};

const initialState: SoundsState = {};

export const createSoundsSubslice = createSubslice({
    name: 'sounds',
    initialState,
    selectors: {
        select: state => state
    },
    reducers: {
        updated: (state, action: PayloadAction<ESounds>) => ({
            id: action.payload
        })
    }
});

export const createSounds = (Subslice: Subslice<typeof createSoundsSubslice>) => {
    const { select } = Subslice.selectors;
    const { updated } = Subslice.actions;

    const update = (sound: ESounds) => (dispatch: Dispatch) => dispatch(updated(sound));

    return {
        select,
        update
    };
};

export type ISounds = ReturnType<typeof createSounds>;
