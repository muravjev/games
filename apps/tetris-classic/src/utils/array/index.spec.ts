import { createArray } from '.';

describe('utils', () => {
    describe('array', () => {
        test('createArray', () => {
            expect(createArray(2, 7)).toStrictEqual([7, 7]);
        });
    });
});
