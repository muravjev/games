import type { ComponentType } from 'react';

import { useEffect, useState } from 'react';
import { createDeferred } from '@muravjev/utils-deferred';

function withFallbackThunk<T extends object>(
    Fallback: ComponentType<T>,
    promises: Promise<unknown>[]
) {
    return function withFallback(Component: ComponentType<T>) {
        return function FallbackHoc(props: T) {
            const [isReady, setIsRedy] = useState(false);

            useEffect(() => {
                Promise.all(promises)
                    .then(() => setIsRedy(true))
                    .catch((e: unknown) => console.log('ERROR LOADING', e));
            }, []);

            return isReady ? <Component {...props} /> : <Fallback {...props} />;
        };
    };
}

function log(result: 'resolved' | 'rejected', value: unknown, ...args: unknown[]) {
    console.log(
        '  .. %s %c%s%c',
        value,
        `color:${result === 'resolved' ? 'yellowgreen' : 'red'}`,
        result,
        'color:white;font-weight:bold',
        ...args
    );
}

export type FallbackCallbacks = {
    resolve: (name: string, ...args: unknown[]) => void;
    reject: (name: string, error: unknown, ...args: unknown[]) => void;
};

type Func<T> = (Component: ComponentType<T>, callbacks: FallbackCallbacks) => ComponentType<T>;

export function withFallback<T extends object>(...fns: Func<T>[]) {
    return function (Component: ComponentType<T>, Fallback: ComponentType<T>): ComponentType<T> {
        const promises: Promise<unknown>[] = [];
        const compose = (component: ComponentType<T>, func: Func<T>) => {
            const { promise, resolve, reject } = createDeferred<string>();
            promises.push(promise);

            const callbacks: FallbackCallbacks = {
                resolve(name, ...args) {
                    log('resolved', name, ...args);
                    resolve(name);
                },
                reject(name, error, ...args) {
                    log('rejected', name, ...args);
                    reject(error);
                }
            };
            return func(component, callbacks);
        };

        const fallback = withFallbackThunk<T>(Fallback, promises)(Component);
        return fns.reduceRight(compose, fallback);
    };
}
