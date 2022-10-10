import type { Matrix } from 'utils/matrix';
import type { Position } from 'features/game/game';
import type { QueueConfigFigure } from 'features/game/queue/queueConfig';
import type { QueueFigure } from 'features/game/queue/queue';

import { CustomError } from 'utils/errors';
import { getMatrixHeight, getMatrixWidth } from 'utils/matrix';

function translate(figure: Matrix, index: number): Matrix {
    return figure.map(row => row.map(x => (x > 0 ? index : x)));
}

function calcYPosition(figure: Matrix): number {
    const height = getMatrixHeight(figure);
    for (let y = 0; y < height; y++) {
        if (figure[y].some(e => e > 0)) {
            return y > 0 ? -y : 0;
        }
    }

    throw new CustomError('Figure should have at least one pixel');
}

function calcXPosition(figure: Matrix, boardWidth: number): number {
    //< @todo subject of config
    //<     floor -> The rest spawn in the left-middle columns
    //<     ceiling -> The rest spawn in the right-middle columns
    const figureWidth = getMatrixWidth(figure);
    const paddingWidth = boardWidth - figureWidth;
    return Math.floor(paddingWidth / 2);
}

function calcPosition(figure: Matrix, boardWidth: number): Position {
    const x = calcXPosition(figure, boardWidth);
    const y = calcYPosition(figure);
    return { x, y };
}

function cutRows(figure: Matrix): Matrix {
    return figure.filter(e => e.some(e => e !== 0));
}

function getEmptyColumns(figure: Matrix): number[] {
    const emptyColumns: number[] = [];
    const width = getMatrixWidth(figure);
    for (let x = 0; x < width; x++) {
        if (figure.every(e => e[x] === 0)) {
            emptyColumns.push(x);
        }
    }
    return emptyColumns;
}

function cutColumns(figure: Matrix): Matrix {
    const emptyColumns = getEmptyColumns(figure);
    if (emptyColumns.length) {
        return figure.map(e => e.filter((_, x) => !emptyColumns.includes(x)));
    }
    return figure;
}

function calcCutted(figure: Matrix): Matrix {
    return cutColumns(cutRows(figure));
}

export function createFigures(
    figures: Readonly<Pick<QueueConfigFigure, 'figure'>[]>,
    boardWidth: number
): QueueFigure[] {
    return figures.map((e, i) => {
        const figure = translate(e.figure, i + 1);
        const position = calcPosition(e.figure, boardWidth);
        const cutted = calcCutted(figure);
        return {
            figure,
            position,
            cutted
        };
    });
}
