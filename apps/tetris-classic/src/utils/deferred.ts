import { notNull } from './typescript';

export type Deferred<T> = {
    resolve: (value: T) => void;
    reject: (reason?: unknown) => void;
    promise: Promise<T>;
};

export function createDeferred<T>(): Deferred<T> {
    let resolve: ((value: T) => void) | null = null;
    let reject: ((reason?: unknown) => void) | null = null;
    const promise = new Promise<T>((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });

    return {
        promise,
        resolve: notNull(resolve!, 'resolve'),
        reject: notNull(reject!, 'reject')
    };
}
