import type { PayloadAction } from '@reduxjs/toolkit';
import type { Mutable } from 'utils/typescript';

import { createActions } from './_/createActions';
import { createReducers } from './_/createReducers';
import { createSelectors } from './_/createSelectors';

type Selector<TState> = (state: Mutable<TState>) => any;
type Reducer<TState> = (state: Mutable<TState>, action: PayloadAction<any>) => TState;

type Options<Name, InitialState, Selectors, Reducers> = {
    name: Name;
    initialState: InitialState;
    selectors: Selectors;
    reducers?: Reducers;
};

export function createSubslice<
    TSubsliceName extends string,
    TSubsliceState,
    TSubsliceSelectors extends Record<string, Selector<TSubsliceState>>,
    TSubsliceReducers extends Record<string, Reducer<TSubsliceState>>
>(options: Options<TSubsliceName, TSubsliceState, TSubsliceSelectors, TSubsliceReducers>) {
    return function <TSliceName extends string>(sliceName: TSliceName) {
        const reducers = createReducers(options.name, options.reducers);
        const actions = createActions(sliceName, options.name, options.reducers);
        const selectors = createSelectors(sliceName, options.name, options.selectors);
        return { ...options, selectors, reducers, actions };
    };
}
