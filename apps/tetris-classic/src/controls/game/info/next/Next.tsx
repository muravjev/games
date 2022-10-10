import type { ComponentType } from 'react';
import type { Select } from 'features/hooks';
import type { Matrix } from 'utils/matrix';

import { useAppSelector } from 'features/hooks';
import { createElement } from 'react';
import { getMatrixSize } from 'utils/matrix';

import { figures } from 'config/game/figures';

import Value from '../_/Value';

import { styled } from '@mui/material/styles';
import S from './Next.module.scss';

const emptyCell: () => ComponentType = () =>
    styled('div')({
        borderColor: 'transparent'
    });

const filledCell: (color: string) => ComponentType = color =>
    styled('div')(({ theme }) => ({
        background: color,
        borderColor: theme.layout.option.border
    }));

const cellTypes = figures.reduce(
    (prev, figure) => [...prev, filledCell(figure.color)],
    [emptyCell()]
);

export interface IGameInfoNext {
    selectInfoNext: Select<Matrix>;
}

type Props = {
    api: IGameInfoNext;
    cellWidth: number;
};

const Figure = ({ api, cellWidth }: Props) => {
    const figure = useAppSelector(api.selectInfoNext);
    const [width, height] = getMatrixSize(figure);

    const Grid = styled('div')({
        gridTemplateColumns: `repeat(${width}, ${cellWidth}px)`,
        gridTemplateRows: `repeat(${height}, ${cellWidth}px)`
    });

    const cells = [];
    let key = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cellType = cellTypes[figure[y][x]];
            cells.push(createElement(cellType, { key: key++ }));
        }
    }

    return <Grid className={S.figure}>{cells}</Grid>;
};

const Next = ({ api, cellWidth }: Props) => {
    const wrapperStyle = {
        minHeight: `${2 * cellWidth}px`
    };

    return (
        <>
            <Value>
                <div style={wrapperStyle} className={S.wrapper}>
                    <Figure cellWidth={cellWidth} api={api} />
                </div>
            </Value>
        </>
    );
};

export default Next;
