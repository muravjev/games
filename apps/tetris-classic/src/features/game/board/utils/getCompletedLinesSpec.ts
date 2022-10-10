import type { Matrix } from 'utils/matrix';

import { getCompletedLines } from './getCompletedLines';

export const getCompletedLinesSpec = () => {
    describe('getCompletedLines', () => {
        const cases: { merge: Matrix; expected: number[] }[] = [
            {
                merge: [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ],
                expected: []
            },
            {
                merge: [
                    [0, 1, 1],
                    [0, 1, 0],
                    [1, 1, 0]
                ],
                expected: []
            },
            {
                merge: [
                    [0, 1, 1],
                    [0, 1, 0],
                    [1, 1, 2]
                ],
                expected: [2]
            },
            {
                merge: [
                    [0, 1, 1],
                    [3, 1, 2],
                    [1, 1, 2]
                ],
                expected: [2, 1]
            },
            {
                merge: [
                    [4, 1, 1],
                    [3, 1, 2],
                    [1, 1, 2]
                ],
                expected: [2, 1, 0]
            }
        ];
        test.each(cases)('case $#', ({ merge, expected }) => {
            expect(getCompletedLines(merge)).toStrictEqual(expected);
        });
    });
};
