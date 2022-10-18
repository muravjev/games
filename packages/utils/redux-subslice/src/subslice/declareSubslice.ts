import type { PayloadAction } from '@reduxjs/toolkit';
import type { Fn, Mutable } from '@muravjev/utils-core-ts';

import { Action } from './_/createActions';

export type Subslice<TState, T> = T extends {
    reducers?: infer A;
    selectors: infer S extends Record<string, Fn>;
}
    ? {
          actions: { [k in keyof A]: Action<A[k]> };
          selectors: { [k in keyof S]: (state: TState) => ReturnType<S[k]> };
      }
    : never;

type Selector<TState> = (state: Mutable<TState>) => any;

type Reducer<TState> = (state: Mutable<TState>, action: PayloadAction<any>) => TState;

export function declareSubslice<
    TName extends string,
    TState,
    TSelectors extends Record<string, Selector<TState>>,
    TReducers extends Record<string, Reducer<TState>>
>(options: { name: TName; initialState: TState; selectors: TSelectors; reducers?: TReducers }) {
    return options;
}
