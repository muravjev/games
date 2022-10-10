import type { Matrix } from 'utils/matrix';

import { getMatrixHeight } from 'utils/matrix';

export function getCompletedLines(merge: Matrix): number[] {
    const lines: number[] = [];
    const startY = 0;
    const mergeHeight = getMatrixHeight(merge);
    const endY = mergeHeight - 1;
    for (let y = endY; y >= startY; y--) {
        if (merge[y].every(cell => cell > 0)) {
            lines.push(y);
        }
    }
    return lines;
}
