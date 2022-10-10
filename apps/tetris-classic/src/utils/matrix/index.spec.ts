import {
    getMatrixWidth,
    getMatrixHeight,
    getMatrixSize,
    createMatrix,
    cloneMatrix,
    rotateMatrix
} from '.';

describe('utils', () => {
    describe('matrix', () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];

        test('getMatrixWidth', () => {
            expect(getMatrixWidth(matrix)).toBe(3);
        });

        test('getMatrixHeight', () => {
            expect(getMatrixHeight(matrix)).toBe(2);
        });

        test('getMatrixSize', () => {
            expect(getMatrixSize(matrix)).toStrictEqual([3, 2]);
        });

        test('createMatrix', () => {
            expect(createMatrix(2, 2, 7)).toStrictEqual([
                [7, 7],
                [7, 7]
            ]);
        });

        test('cloneMatrix', () => {
            const result = cloneMatrix(matrix);
            expect(result).not.toBe(matrix);
            expect(result).toStrictEqual(matrix);
        });

        describe('rotateMatrix', () => {
            const matrix = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];
            const cases = [
                {
                    clockwise: true,
                    expected: [
                        [7, 4, 1],
                        [8, 5, 2],
                        [9, 6, 3]
                    ]
                },
                {
                    clockwise: false,
                    expected: [
                        [3, 6, 9],
                        [2, 5, 8],
                        [1, 4, 7]
                    ]
                }
            ];
            test.each(cases)('clockwise: %s', ({ clockwise, expected }) => {
                expect(rotateMatrix(matrix, clockwise)).toStrictEqual(expected);
            });
        });
    });
});
