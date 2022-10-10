import { prepareQueue } from './prepareQueue';

export const prepareQueueSpec = () =>
    describe('prepareQueue', () => {
        const indexes = [1, 2, 3];

        test('Original queue length = 0', () => {
            const pending: number[] = [];
            const result = prepareQueue(indexes, pending);
            expect(result).not.toBe(indexes);
            expect(result.length).toBe(indexes.length);
            expect(result).toEqual(expect.arrayContaining(indexes));
        });

        test('Original queue length = 1', () => {
            const pending = [10];
            const result = prepareQueue(indexes, pending);
            expect(result).not.toBe(pending);
            expect(result.length).toBe(pending.length + indexes.length);
            expect(result.slice(-pending.length)).toStrictEqual(pending);
            expect(result).toEqual(expect.arrayContaining(indexes));
        });

        test('Original queue length > 1', () => {
            const pending = [10, 20];
            const result = prepareQueue(indexes, pending);
            expect(result).not.toBe(pending);
            expect(result).toStrictEqual(pending);
        });
    });
