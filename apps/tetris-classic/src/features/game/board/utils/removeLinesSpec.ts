import { removeLines } from './removeLines';

export const removeLinesSpec = () =>
    describe('removeLines', () => {
        const cases = [
            {
                merge: [
                    [2, 0, 0],
                    [2, 1, 1], //< *
                    [2, 1, 0],
                    [2, 1, 0],
                    [2, 2, 2]
                ],
                lines: [1],
                expected: [
                    [0, 0, 0],
                    [2, 0, 0],
                    [2, 1, 0],
                    [2, 1, 0],
                    [2, 2, 2]
                ]
            },
            {
                merge: [
                    [2, 0, 0],
                    [2, 1, 1], //< *
                    [2, 1, 2], //< *
                    [2, 1, 0],
                    [2, 2, 2]
                ],
                lines: [2, 1],
                expected: [
                    [0, 0, 0],
                    [0, 0, 0],
                    [2, 0, 0],
                    [2, 1, 0],
                    [2, 2, 2]
                ]
            },
            {
                merge: [
                    [2, 0, 0],
                    [2, 0, 0],
                    [2, 1, 1], //< *
                    [2, 1, 2], //< *
                    [2, 1, 2] //< *
                ],
                lines: [4, 3, 2],
                expected: [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [2, 0, 0],
                    [2, 0, 0]
                ]
            }
        ];
        test.each(cases)('case $#', ({ merge, lines, expected }) => {
            expect(removeLines(merge, lines)).toStrictEqual(expected);
        });
    });
