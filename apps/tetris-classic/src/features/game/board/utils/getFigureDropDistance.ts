import type { Matrix } from 'utils/matrix';
import type { Figure } from 'features/game/game';

import { getMatrixSize, getMatrixHeight } from 'utils/matrix';

export function getFigureDropDistance(board: Matrix, figure: Figure): number {
    const boardHeight = getMatrixHeight(board);
    const [figureWidth, figureHeight] = getMatrixSize(figure.figure);
    let lines = +Infinity;
    for (let x = 0; x < figureWidth; x++) {
        for (let y = figureHeight - 1; y >= 0; y--) {
            if (figure.figure[y][x] === 0) continue;
            const boardX = figure.position.x + x;
            let boardY = figure.position.y + y;

            let distance = 0;
            while (++boardY < boardHeight && board[boardY][boardX] === 0) {
                distance++;
            }

            lines = Math.min(lines, distance);
            break;
        }
    }
    return lines;
}
