import { CustomError } from './errors';

export function notNull<T>(value: T | null, name: string): T | never {
    if (value === null) {
        throw new CustomError(`Value (${name}) is null!`);
    }
    return value;
}

export const getObjectKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export type Fn = (...args: any[]) => any;

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
