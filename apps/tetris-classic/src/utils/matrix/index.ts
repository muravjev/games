export type Matrix<T = number> = T[][];

export const getMatrixWidth = <T>(matrix: Matrix<T>) => matrix[0].length;
export const getMatrixHeight = <T>(matrix: Matrix<T>) => matrix.length;
export const getMatrixSize = <T>(matrix: Matrix<T>) => [
    getMatrixWidth(matrix),
    getMatrixHeight(matrix)
];

export const createMatrix = <T>(dx: number, dy: number, value: T) => {
    return Array.from(Array(dy), () => Array.from(Array(dx), () => value));
};

export const cloneMatrix = <T>(matrix: Matrix<T>): Matrix<T> => matrix.map<T[]>(row => row.slice());

const transpose = <T>(matrix: Matrix<T>) => {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < y; x++) {
            [matrix[y][x], matrix[x][y]] = [matrix[x][y], matrix[y][x]];
        }
    }
};

const reverseRows = <T>(matrix: Matrix<T>) => {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < (matrix.length - 1) / 2; x++) {
            const o = matrix.length - 1 - x;
            [matrix[x][y], matrix[o][y]] = [matrix[o][y], matrix[x][y]];
        }
    }
};

export const rotateMatrix = <T>(matrix: Matrix<T>, clockwise: boolean) => {
    const result = cloneMatrix(matrix);
    if (clockwise) {
        reverseRows(result);
        transpose(result);
    } else {
        transpose(result);
        reverseRows(result);
    }
    return result;
};
