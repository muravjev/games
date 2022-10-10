import type { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Fn } from 'utils/typescript';

import { getObjectKeys } from 'utils/typescript';
import { createAction } from '@reduxjs/toolkit';

type Action<TReducer> = TReducer extends (state: any) => any
    ? ActionCreatorWithoutPayload
    : TReducer extends (state: any, action: PayloadAction<infer T>) => any
    ? ActionCreatorWithPayload<T>
    : never;

type Actions<TReducers> = { [k in keyof TReducers]: Action<TReducers[k]> };

export function createActions<
    TSliceName extends string,
    TSubsliceName extends string,
    TSubsliceReducers extends Record<keyof TSubsliceReducers, Fn>
>(sliceName: TSliceName, subsliceName: TSubsliceName, subsliceReducers?: TSubsliceReducers) {
    const actions = {} as Actions<TSubsliceReducers>;

    if (subsliceReducers) {
        const keys = getObjectKeys(subsliceReducers);
        for (const name of keys) {
            actions[name] = createAction([sliceName, subsliceName, name].join('/')) as Action<
                TSubsliceReducers[keyof TSubsliceReducers]
            >;
        }
    }
    return actions;
}
