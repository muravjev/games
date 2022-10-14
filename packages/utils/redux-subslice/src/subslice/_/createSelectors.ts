import type { Fn } from '@muravjev/utils-typescript';

import { getObjectKeys } from '@muravjev/utils-typescript';

export type Selector<
    TSliceName extends string,
    TSubsliceName extends string,
    TSelector extends Fn
> = (state: {
    [k in TSliceName]: {
        [k in TSubsliceName]: Parameters<TSelector>[0];
    };
}) => ReturnType<TSelector>;

type Selectors<
    TSliceName extends string,
    TSubsliceName extends string,
    TSelectors extends Record<keyof TSelectors, Fn>
> = {
    [k in keyof TSelectors]: Selector<TSliceName, TSubsliceName, TSelectors[k]>;
};

export function createSelectors<
    TSliceName extends string,
    TSubsliceName extends string,
    TSubsliceSelectors extends Record<keyof TSubsliceSelectors, Fn>
>(
    sliceName: TSliceName,
    subsliceName: TSubsliceName,
    subsliceSelectors: TSubsliceSelectors
): Selectors<TSliceName, TSubsliceName, TSubsliceSelectors> {
    const selectors = {} as Selectors<TSliceName, TSubsliceName, TSubsliceSelectors>;
    const keys = getObjectKeys(subsliceSelectors);
    for (const key of keys) {
        selectors[key] = state => subsliceSelectors[key](state[sliceName][subsliceName]);
    }
    return selectors;
}
