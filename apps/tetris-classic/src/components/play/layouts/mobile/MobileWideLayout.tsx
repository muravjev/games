import type { CalcCellWidth, GameLayout } from 'controls/game/layout/GameLayout';
import type { IGameActions, IGameBoardMerge, IGameStage } from 'features/game/game';

import { play } from 'components/play/playSlice';

import MobileGameLayout from 'controls/game/layout/mobile/MobileGameLayout';
import Board from 'controls/game/board/Board';
import InfoWide from 'controls/game/info/InfoWide';

import C from 'config/layouts.json';
import S from './MobileWideLayout.module.scss';

const calcCellWidth: CalcCellWidth = calcs => {
    const { layoutWidth, layoutHeight, boardWidth, boardHeight } = calcs;
    const { padding, infoWidth, buttonsMinWidth: buttons } = C.mobile;

    const maxHeight = 600;

    const extraHeight = 0;
    const extraWidth = buttons + padding + /* board + */ padding + infoWidth + padding + buttons;

    const cellWidthFromWidth = (layoutWidth - extraWidth) / boardWidth;
    const cellWidthFromHeight = (Math.min(layoutHeight, maxHeight) - extraHeight) / boardHeight;

    return Math.min(cellWidthFromWidth, cellWidthFromHeight);
};

function Body({ cellWidth }: { cellWidth: number }) {
    return (
        <div className={S.body}>
            <div className={S.board}>
                <Board api={play as IGameBoardMerge} cellWidth={cellWidth} />
            </div>
            <div className={S.info}>
                <InfoWide cellWidth={cellWidth} api={play} />
            </div>
        </div>
    );
}

const Layout: GameLayout = ({ cellWidth }) => {
    const middle = <Body cellWidth={cellWidth} />;
    return <MobileGameLayout api={play as IGameStage & IGameActions} middle={middle} />;
};

const MobileWideLayout = {
    calcCellWidth,
    Layout
};

export default MobileWideLayout;
