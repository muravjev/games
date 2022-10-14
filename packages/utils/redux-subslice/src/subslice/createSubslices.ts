import type { Slice } from '@reduxjs/toolkit';
import type { Fn } from '@muravjev/utils-typescript';

import { createSlice } from '@reduxjs/toolkit';
import { createReducers } from './_/createReducers';
import { Action, createActions } from './_/createActions';
import { createSelectors, Selector } from './_/createSelectors';

type Option = {
    name: string;
    initialState: any;
    selectors: Record<string, Fn>;
    reducers?: Record<string, Fn>;
};

//< Typing reducers

type Reducers<T extends Option[], R = {}> = T extends []
    ? R
    : T extends [infer Head extends Option, ...infer Tail extends Option[]]
    ? Reducers<Tail, R & Pick<Head, 'reducers'>>
    : never;

//< Typing initialState

type InitialStates<T extends Option[], R = {}> = T extends []
    ? R
    : T extends [infer Head extends Option, ...infer Tail extends Option[]]
    ? InitialStates<Tail, R & { [k in Head['name']]: Head['initialState'] }>
    : never;

//< Typing selectors

type Subslice<T extends Option, SliceName extends string> = T extends {
    name: infer N extends string;
    selectors: infer S extends Record<string, Fn>;
    reducers?: infer A;
}
    ? {
          [k in N as `${k}Subslice`]: {
              selectors: { [k in keyof S]: Selector<SliceName, N, S[k]> };
              actions: { [k in keyof A]: Action<A[k]> };
          };
      }
    : never;

type Subslices<SliceName extends string, T extends Option[], R = Record<string, any>> = T extends []
    ? R
    : T extends [infer Head extends Option, ...infer Tail extends Option[]]
    ? Subslices<SliceName, Tail, R & Subslice<Head, SliceName>>
    : never;

export function createSubslices<TSliceName extends string, T extends Option[]>(
    name: TSliceName,
    ...options: T
): [Slice<InitialStates<T>, Reducers<T>, TSliceName>, Subslices<TSliceName, T>] {
    const initialState = options.reduce(
        (p, o) => ({ ...p, [o.name]: o.initialState }),
        {} as InitialStates<T>
    );

    const reducers = options.reduce(
        (p, o) => ({ ...p, ...createReducers(o.name, o.reducers) }),
        {}
    );

    const slice = createSlice<InitialStates<T>, typeof reducers, TSliceName>({
        name,
        initialState,
        reducers
    }) as Slice<InitialStates<T>, Reducers<T>, TSliceName>;

    const subslices = options.reduce(
        (p, o) => ({
            ...p,
            [`${o.name}Subslice`]: {
                selectors: createSelectors(name, o.name, o.selectors),
                actions: createActions(name, o.name, o.reducers)
            }
        }),
        {}
    ) as Subslices<TSliceName, T>;

    return [slice, subslices];
}
