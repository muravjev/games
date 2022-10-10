import type { Matrix } from 'utils/matrix';
import type { Position } from 'features/game/game';

import { createFigures } from './createFigures';

const cases: {
    boardWidth: number;
    figures: { source: Matrix; target: Matrix; cutted: Matrix; position: Position }[];
}[] = [
    {
        boardWidth: 5,
        figures: [
            {
                source: [
                    [1, 1],
                    [1, 1]
                ],
                target: [
                    [1, 1],
                    [1, 1]
                ],
                cutted: [
                    [1, 1],
                    [1, 1]
                ],
                position: {
                    y: 0,
                    x: 1
                }
            },
            {
                source: [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                target: [
                    [0, 2, 0],
                    [2, 2, 2],
                    [0, 0, 0]
                ],
                cutted: [
                    [0, 2, 0],
                    [2, 2, 2]
                ],
                position: {
                    y: 0,
                    x: 1
                }
            },
            {
                source: [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                target: [
                    [0, 0, 0, 0],
                    [3, 3, 3, 3],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                cutted: [[3, 3, 3, 3]],
                position: {
                    y: -1,
                    x: 0
                }
            },
            {
                source: [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                target: [
                    [0, 0, 0, 0],
                    [0, 4, 4, 0],
                    [0, 4, 4, 0],
                    [0, 0, 0, 0]
                ],
                cutted: [
                    [4, 4],
                    [4, 4]
                ],
                position: {
                    y: -1,
                    x: 0
                }
            }
        ]
    },
    {
        boardWidth: 6,
        figures: [
            {
                source: [
                    [1, 1],
                    [1, 1]
                ],
                target: [
                    [1, 1],
                    [1, 1]
                ],
                cutted: [
                    [1, 1],
                    [1, 1]
                ],
                position: {
                    y: 0,
                    x: 2
                }
            },
            {
                source: [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                target: [
                    [0, 2, 0],
                    [2, 2, 2],
                    [0, 0, 0]
                ],
                cutted: [
                    [0, 2, 0],
                    [2, 2, 2]
                ],
                position: {
                    y: 0,
                    x: 1
                }
            },
            {
                source: [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                target: [
                    [0, 0, 0, 0],
                    [3, 3, 3, 3],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                cutted: [[3, 3, 3, 3]],
                position: {
                    y: -1,
                    x: 1
                }
            }
        ]
    }
];

export const createFiguresSpec = () => {
    describe('Figures calcs', () => {
        test.each(cases)('figure %j', ({ figures, boardWidth }) => {
            const sources = figures.map(e => ({
                figure: e.source
            }));
            const targets = figures.map(e => ({
                figure: e.target,
                cutted: e.cutted,
                position: e.position
            }));
            expect(createFigures(sources, boardWidth)).toEqual(targets);
        });
    });
};
