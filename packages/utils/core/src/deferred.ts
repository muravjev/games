import { noop } from './utils';

export type Deferred<T> = {
    resolve: (value: T) => void;
    reject: (reason?: unknown) => void;
    promise: Promise<T>;
};

export function createDeferred<T>(): Deferred<T> {
    let resolve: (value: T) => void = noop;
    let reject: (reason?: unknown) => void = noop;
    const promise = new Promise<T>((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });

    return {
        promise,
        resolve,
        reject
    };
}
