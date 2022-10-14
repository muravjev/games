import type { Subslice } from '@muravjev/utils-redux-subslice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TState, Dispatch } from 'features/hooks';
import type { ESounds } from 'config/sounds';

import { declareSubslice } from '@muravjev/utils-redux-subslice';

export type SoundsState = {
    id?: ESounds;
};

const initialState: SoundsState = {};

export const soundsOptions = declareSubslice({
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

export const createSounds = (Subslice: Subslice<TState, typeof soundsOptions>) => {
    const { select } = Subslice.selectors;
    const { updated } = Subslice.actions;

    const update = (sound: ESounds) => (dispatch: Dispatch) => dispatch(updated(sound));

    return {
        select,
        update
    };
};

export type ISounds = ReturnType<typeof createSounds>;
