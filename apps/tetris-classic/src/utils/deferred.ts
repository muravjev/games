import { notNull } from './typescript';

export type Deferred<T> = {
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
    promise: Promise<T>;
};

export function createDeferred<T>(): Deferred<T> {
    var resolve: ((value: T) => void) | null = null;
    var reject: ((reason?: any) => void) | null = null;
    var promise = new Promise<T>((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });

    return {
        promise,
        resolve: notNull(resolve!, 'resolve'),
        reject: notNull(reject!, 'reject')
    };
}
