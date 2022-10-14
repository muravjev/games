import type { Fn } from '@muravjev/utils-typescript';

import { getObjectKeys } from '@muravjev/utils-typescript';

type Reducer<TSubsliceName extends string, TReducer> = TReducer extends (
    state: infer TState,
    action: infer TAction
) => any
    ? (state: { [k in TSubsliceName]: TState }, action: TAction) => TState
    : never;

type Reducers<TSubsliceName extends string, TReducers extends Record<keyof TReducers, Fn>> = {
    [k: string]: Reducer<TSubsliceName, TReducers[keyof TReducers]>;
};

function createReducer<TSubsliceName extends string>(
    subsliceName: TSubsliceName,
    subsliceReducer: Fn
) {
    const reducer: Reducer<TSubsliceName, Fn> = (state, action) => {
        const before = state[subsliceName];
        const after = subsliceReducer(before, action) ?? before;
        return { ...state, [subsliceName]: after };
    };

    return reducer;
}

export function createReducers<
    TSubsliceName extends string,
    TSubsliceReducers extends Record<keyof TSubsliceReducers, Fn>
>(subsliceName: TSubsliceName, subsliceReducers?: TSubsliceReducers) {
    const reducers = {} as Reducers<TSubsliceName, TSubsliceReducers>;

    if (subsliceReducers) {
        const keys = getObjectKeys(subsliceReducers);
        for (const key of keys) {
            reducers[[subsliceName, key].join('/')] = createReducer(
                subsliceName,
                subsliceReducers[key]
            ) as Reducer<TSubsliceName, TSubsliceReducers[keyof TSubsliceReducers]>;
        }
    }
    return reducers;
}
