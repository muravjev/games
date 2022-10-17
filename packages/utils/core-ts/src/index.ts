export const getObjectKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export type Fn = (...args: any[]) => any;

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
