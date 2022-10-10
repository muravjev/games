import type { Slice } from '@reduxjs/toolkit';
import type { TState } from 'features/hooks';
import type { Fn } from 'utils/typescript';

import { createSlice } from '@reduxjs/toolkit';

type InitialStateFormat<T> = T extends {
    name: infer TName extends string;
    initialState: infer TInitialState;
}
    ? { [k in TName]: TInitialState }
    : never;

type InitialState<T extends Fn[], R = {}> = T extends []
    ? R
    : T extends [infer Head extends Fn, ...infer Tail extends Fn[]]
    ? InitialState<Tail, R & InitialStateFormat<ReturnType<Head>>>
    : never;

type ReducersFormat<T> = T extends { reducers: infer TReducers } ? TReducers : never;

type Reducers<T extends Fn[], R = {}> = T extends []
    ? R
    : T extends [infer Head extends Fn, ...infer Tail extends Fn[]]
    ? Reducers<Tail, R & ReducersFormat<ReturnType<Head>>>
    : never;

type Selector<T> = T extends (state: any) => infer R ? (state: TState) => R : never;

type Selectors<T> = {
    [k in keyof T]: Selector<T[k]>;
};

export type Subslice<T> = T extends (sliceName: string) => {
    selectors: infer S;
    actions?: infer A;
}
    ? { selectors: Selectors<S>; actions: A }
    : never;

type SubslicesFormat<T> = T extends (sliceName: string) => { name: infer TName extends string }
    ? { [k in TName as `${k}Subslice`]: Subslice<T> }
    : never;

type Subslices<SliceName extends string, T extends Fn[], R = {}> = T extends []
    ? R
    : T extends [infer Head extends Fn, ...infer Tail extends Fn[]]
    ? Subslices<SliceName, Tail, R & SubslicesFormat<Head>>
    : never;

export function createSubslices<TSliceName extends string, T extends Fn[]>(
    name: TSliceName,
    ...factories: T
): [Slice<InitialState<T>, Reducers<T>, TSliceName>, Subslices<TSliceName, T>] {
    const subslicesByName = factories.map(b => b(name));
    const initialState = subslicesByName.reduce(
        (p, d) => ({ ...p, [d.name]: d.initialState }),
        {} as InitialState<T>
    );
    const reducers = subslicesByName.reduce((p, d) => ({ ...p, ...d.reducers }), {});

    const slice = createSlice<InitialState<T>, typeof reducers, TSliceName>({
        name,
        initialState,
        reducers
    }) as Slice<InitialState<T>, Reducers<T>, TSliceName>;

    const subslices = subslicesByName.reduce(
        (p, d) => ({
            ...p,
            [`${d.name}Subslice`]: {
                selectors: d.selectors,
                actions: d.actions
            }
        }),
        {}
    ) as Subslices<TSliceName, T>;

    return [slice, subslices];
}
