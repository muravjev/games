import { CustomError } from './errors';

export function notNull<T>(value: T | null, name: string): T | never {
    if (value === null) {
        throw new CustomError(`Value (${name}) is null!`);
    }
    return value;
}
