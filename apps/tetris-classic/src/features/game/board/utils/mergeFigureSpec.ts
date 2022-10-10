import { mergeFigure } from './mergeFigure';

export const mergeFigureSpec = () =>
    describe('mergeFigure', () => {
        const board = [
            [10, 0, 12, 13],
            [20, 0, 0, 23],
            [30, 0, 32, 33],
            [40, 41, 42, 43]
        ];
        const figure = [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ];
        const position = { x: 0, y: 0 };
        const expected = [
            [10, 1, 12, 13],
            [20, 1, 1, 23],
            [30, 1, 32, 33],
            [40, 41, 42, 43]
        ];
        test('successfull merge', () => {
            const result = mergeFigure(board, { figure, position });
            expect(result).toStrictEqual(expected);
        });
    });
