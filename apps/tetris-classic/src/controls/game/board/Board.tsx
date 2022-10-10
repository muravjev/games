import type { ComponentType, PropsWithChildren, ReactNode } from 'react';
import type { IGameBoardMerge } from 'features/game/game';

import { useAppSelector } from 'features/hooks';
import { createElement } from 'react';
import { getMatrixSize } from 'utils/matrix';

import { figures } from 'config/game/figures';
// import { Center } from './center/Center';

import { styled } from '@mui/material/styles';
import S from './Board.module.scss';

const emptyCell: ComponentType = () => <div />;

const filledCell: (color: string) => ComponentType = color =>
    styled('div')({
        background: color
    });

const cellTypes = figures.reduce<ComponentType<PropsWithChildren>[]>(
    (prev, figure) => [...prev, filledCell(figure.color)],
    [emptyCell]
);

type Props = {
    api: IGameBoardMerge;
    cellWidth: number;
};

const Board = ({ api, cellWidth }: Props): JSX.Element => {
    const board = useAppSelector(api.selectMerge);
    const [width, height] = getMatrixSize(board);

    const Grid = styled('div')(({ theme }) => ({
        width: `${width * cellWidth}px`,
        height: `${height * cellWidth}px`,
        gridTemplateColumns: `repeat(${width}, ${cellWidth}px)`,
        '& > div ': {
            borderColor: theme.layout.option.border
        }
    }));

    const cells: ReactNode[] = [];
    let key = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const v = board[y][x];
            const CellType = cellTypes[v % 10];
            const f = v > 10 ? () => <CellType>{Math.floor(v / 10)}</CellType> : CellType;
            cells.push(createElement(f, { key: key++ }));
        }
    }

    return (
        <Grid className={S.board}>
            {cells}
            {/* <Center cellwidth={cellWidth} /> */}
        </Grid>
    );
};

export default Board;
