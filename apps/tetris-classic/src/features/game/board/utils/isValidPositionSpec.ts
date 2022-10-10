import type { Position } from 'features/game/game';

import { isValidPosition } from './isValidPosition';

export const isValidPositionSpec = () =>
    describe('isValidPosition', () => {
        describe('figure out of border', () => {
            const board = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
            const figure = [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
            ];
            const cases: [Position, boolean][] = [
                [{ x: 0, y: 0 }, true],
                [{ x: -1, y: 0 }, true],
                [{ x: -2, y: 0 }, false],
                [{ x: 1, y: 0 }, false],
                [{ x: 0, y: 1 }, false],
                [{ x: 1, y: 1 }, false],
                [{ x: 0, y: -1 }, false]
            ];
            test.each(cases)('position: %j, is valid: %s', (position, expected) => {
                expect(isValidPosition(board, { figure, position })).toBe(expected);
            });
        });

        describe('figure cells conflict', () => {
            const board = [
                [1, 0, 1, 1],
                [1, 0, 0, 1],
                [1, 0, 1, 1],
                [1, 1, 1, 1]
            ];
            const figure = [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
            ];
            const cases: [Position, boolean][] = [
                [{ x: 0, y: 0 }, true],
                [{ x: -1, y: 0 }, false],
                [{ x: 1, y: 0 }, false],
                [{ x: 0, y: 1 }, false],
                [{ x: 1, y: 1 }, false]
            ];
            test.each(cases)('position: %j, is valid: %s', (position, expected) => {
                expect(isValidPosition(board, { figure, position })).toBe(expected);
            });
        });
    });
