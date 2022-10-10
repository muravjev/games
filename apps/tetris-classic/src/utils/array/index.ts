export function createArray<T>(dx: number, value: T): T[] {
    return Array.from(Array(dx), () => value);
}
