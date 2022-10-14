import type { Subslice } from '@muravjev/utils-redux-subslice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TState, Thunk } from 'features/hooks';
import type { IFactorsConfig } from './factorsConfig';

import { declareSubslice } from '@muravjev/utils-redux-subslice';

const initialState = {
    soft: false, //     -- whether we are in soft drop
    moveDelay: 60, //   -- frame
    softDelay: 1, //    -- frame
    spawn: true, //     -- whether we are in spawn await
    spawnDelay: 30, //  -- frames
    lockDelay: 30, //   -- frames
    burnDelay: 42 //    -- frames
};

type FactorsState = typeof initialState;

export const factorsOptions = declareSubslice({
    name: 'factors',
    initialState,
    selectors: {
        selectSoft: state => state.soft,
        selectMoveDelay: state => (state.soft ? state.softDelay : state.moveDelay),
        selectSpawnDelay: state => (state.spawn ? 0 : state.spawnDelay),
        selectLockDelay: state => (state.spawn ? 0 : state.lockDelay),
        selectBurnDelay: state => (state.spawn ? 0 : state.burnDelay)
    },
    reducers: {
        configured: (state, action: PayloadAction<FactorsState>) => ({
            ...state,
            ...action.payload
        }),
        softApplied: (state, action: PayloadAction<boolean>) => ({
            ...state,
            soft: action.payload
        }),
        spawnApplied: (state, action: PayloadAction<boolean>) => ({
            ...state,
            spawn: action.payload
        }),
        moveDelayChanged: (state, action: PayloadAction<number>) => ({
            ...state,
            moveDelay: action.payload
        })
    }
});

export const createFactors = (
    Subslice: Subslice<TState, typeof factorsOptions>,
    FactorsConfig: IFactorsConfig
) => {
    // const { selectMoveDelay, selectSpawnDelay, selectLockDelay, selectBurnDelay } =
    //     Subslice.selectors;
    const { configured, softApplied, spawnApplied, moveDelayChanged } = Subslice.actions;

    const configure: () => Thunk = () => (dispatch, getState) => {
        const config = FactorsConfig.select(getState());
        dispatch(configured({ ...config, soft: false, spawn: false }));
    };

    const applySoft: (soft: boolean) => Thunk = soft => dispatch => dispatch(softApplied(soft));
    const applySpawn: (spawn: boolean) => Thunk = spawn => dispatch =>
        dispatch(spawnApplied(spawn));

    return {
        ...Subslice.selectors,
        configure,
        applySoft,
        applySpawn,
        moveDelayChanged
    };
};

export type IFactors = ReturnType<typeof createFactors>;
