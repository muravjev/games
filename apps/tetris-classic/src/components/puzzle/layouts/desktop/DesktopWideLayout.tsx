import type { CalcCellWidth, GameLayout } from 'controls/game/layout/GameLayout';
import type { IGameBoardMerge, IGameStage } from 'features/game/game';

import { puzzle } from 'components/puzzle/puzzleSlice';

import DesktopGameLayout from 'controls/game/layout/desktop/DesktopGameLayout';
import Hints from 'controls/game/hints/Hints';
import Board from 'controls/game/board/Board';
import PlayButton from 'controls/game/buttons/desktop/PlayButton';

import C from 'config/layouts.json';
import S from './DesktopWideLayout.module.scss';

const calcCellWidth: CalcCellWidth = calcs => {
    const { layoutWidth, layoutHeight, boardWidth, boardHeight } = calcs;
    const { padding, infoWidth } = C.desktop;

    const maxHeight = 560;

    const extraHeight = 0;
    const extraWidth = /* board + */ padding + infoWidth;

    const cellWidthFromWidth = (layoutWidth - extraWidth) / boardWidth;
    const cellWidthFromHeight = (Math.min(layoutHeight, maxHeight) - extraHeight) / boardHeight;

    return Math.min(cellWidthFromWidth, cellWidthFromHeight);
};

function Body({ cellWidth }: { cellWidth: number }) {
    return (
        <div className={S.body}>
            <div className={S.controls}>
                <Hints />
            </div>
            <div className={S.board}>
                <Board api={puzzle as IGameBoardMerge} cellWidth={cellWidth} />
            </div>
            <div className={S.info}>Info</div>
            <div className={S.button}>
                <PlayButton api={puzzle as IGameStage} />
            </div>
        </div>
    );
}

const Layout: GameLayout = ({ cellWidth }) => {
    const middle = <Body cellWidth={cellWidth} />;
    return <DesktopGameLayout middle={middle} />;
};

const DesktopWideLayout = {
    calcCellWidth,
    Layout
};

export default DesktopWideLayout;
