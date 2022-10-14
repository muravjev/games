import type { Figure } from 'features/game/game';
import type { Matrix } from 'utils/matrix';

import { getMatrixSize, cloneMatrix } from 'utils/matrix';

export function mergeFigure(board: Matrix, figure: Figure): Matrix {
    const merge = cloneMatrix(board);
    const [figureWidth, figureHeight] = getMatrixSize(figure.figure);
    for (let y = 0; y < figureHeight; y++) {
        for (let x = 0; x < figureWidth; x++) {
            const figureCell = figure.figure[y][x];
            if (figureCell) {
                const boardY = figure.position.y + y;
                const boardX = figure.position.x + x;
                merge[boardY][boardX] = figureCell;
            }
        }
    }
    return merge;
}
