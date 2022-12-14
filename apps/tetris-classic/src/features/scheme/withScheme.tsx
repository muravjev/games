import type { ComponentType } from 'react';
import type { FallbackCallbacks } from '@muravjev/features-fallback';

import { createContext, useContext, useEffect } from 'react';
import { useSdk } from 'features/sdk/withSdk';
import { createDeferred } from '@muravjev/utils-core';

const SchemeContext = createContext<Promise<string> | null>(null);
const SchemePromise = createDeferred<string>();

export function withScheme<T extends object>(
    Component: ComponentType<T>,
    { resolve, reject }: FallbackCallbacks
) {
    return function SchemeHoc(props: T) {
        console.log('with scheme');
        const sdk = useSdk();

        useEffect(() => {
            console.log(`. with scheme %cpending sdk`, 'color:grey');
            sdk?.then(api => api.getPreferredMode())
                .then(mode => {
                    SchemePromise.resolve(mode);
                    resolve('scheme', `mode:${mode}`);
                })
                .catch((e: unknown) => {
                    reject('scheme', e);
                });
        }, [sdk]);

        return (
            <SchemeContext.Provider value={SchemePromise.promise}>
                <Component {...props} />
            </SchemeContext.Provider>
        );
    };
}

export const useScheme = () => useContext(SchemeContext);
