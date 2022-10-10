import { Matrix } from 'utils/matrix';
import { Figure } from 'features/game/game';

import { getMatrixSize } from 'utils/matrix';

export function isValidPosition(board: Matrix, figure: Figure): boolean {
    const [boardWidth, boardHeight] = getMatrixSize(board);
    const [figureWidth, figureHeight] = getMatrixSize(figure.figure);
    for (let y = 0; y < figureHeight; y++) {
        for (let x = 0; x < figureWidth; x++) {
            let figureCell = figure.figure[y][x];
            if (figureCell) {
                let boardX = figure.position.x + x;
                if (boardX < 0) return false;
                if (boardX >= boardWidth) return false;

                let boardY = figure.position.y + y;
                if (boardY < 0) return false;
                if (boardY >= boardHeight) return false;

                if (board[boardY][boardX]) return false;
            }
        }
    }
    return true;
}
