import type { Matrix } from 'utils/matrix';

import { getMatrixWidth, cloneMatrix } from 'utils/matrix';
import { createArray } from 'utils/array';

export function removeLines(merge: Matrix, lines: number[]): Matrix {
    const burned = cloneMatrix(merge);
    lines.every(y => burned.splice(y, 1));
    const boardWidth = getMatrixWidth(merge);
    const emptyLine = createArray(boardWidth, 0);
    lines.every(_ => burned.unshift(emptyLine.slice()));
    return burned;
}
