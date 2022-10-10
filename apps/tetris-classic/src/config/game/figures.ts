import type { Matrix } from 'utils/matrix';

type Figure = Readonly<{
    name: string;
    color: string;
    offsetY?: number;
    figure: Matrix<number>;
}>;

export const figures: readonly Figure[] = [
    {
        name: 'T',
        color: '#ff0000',
        figure: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]
    },
    {
        name: 'L',
        color: '#fbb034',
        figure: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]
    },
    {
        name: 'J',
        color: '#ffdd00',
        figure: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ]
    },
    {
        name: 'Z',
        color: '#c1d82f',
        figure: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ]
    },
    {
        name: 'S',
        color: '#00a4e4',
        figure: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ]
    },
    {
        name: 'I',
        color: '#8a7967',
        offsetY: -1,
        figure: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    },
    {
        name: 'O',
        color: '#6a737b',
        figure: [
            [1, 1],
            [1, 1]
        ]
    }
];
