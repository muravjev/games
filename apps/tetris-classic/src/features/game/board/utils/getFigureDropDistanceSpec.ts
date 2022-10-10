import type { Position } from 'features/game/game';

import { getFigureDropDistance } from './getFigureDropDistance';

export const getFigureDropDistanceSpec = () =>
    describe('getFigureDropDistance', () => {
        const position: Position = { x: 0, y: 0 };
        const figure = [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ];
        const board_empty = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        const board_bottom = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [2, 2, 2]
        ];
        const board_gap_1 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 2],
            [0, 0, 2],
            [0, 0, 2],
            [0, 0, 2]
        ];
        const board_gap_2 = [
            [0, 0, 0],
            [0, 0, 0],
            [2, 0, 0],
            [2, 0, 0],
            [2, 0, 0],
            [2, 0, 0]
        ];
        const board_filled_1 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 0]
        ];
        const board_filled_2 = [
            [0, 0, 0],
            [0, 0, 2],
            [0, 0, 2],
            [0, 0, 2],
            [0, 0, 2],
            [0, 0, 2]
        ];
        const cases = [
            {
                board: board_empty,
                expected: 3
            },
            {
                board: board_bottom,
                expected: 2
            },
            {
                board: board_gap_1,
                expected: 1
            },
            {
                board: board_gap_2,
                expected: 3
            },
            {
                board: board_filled_1,
                expected: 0
            },
            {
                board: board_filled_2,
                expected: 0
            }
        ];
        test.each(cases)('case $#', ({ board, expected }) => {
            expect(getFigureDropDistance(board, { figure, position })).toBe(expected);
        });
    });
