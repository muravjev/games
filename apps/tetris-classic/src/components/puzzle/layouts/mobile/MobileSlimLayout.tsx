import type { CalcCellWidth, GameLayout } from 'controls/game/layout/GameLayout';
import type { IGameActions, IGameBoardMerge, IGameStage } from 'features/game/game';

import { puzzle } from 'components/puzzle/puzzleSlice';

import MobileGameLayout from 'controls/game/layout/mobile/MobileGameLayout';
import Board from 'controls/game/board/Board';
// import { InfoSlim } from 'controls/game/info/InfoSlim';
// import { MobileControls } from './controls/MobileControls';

import C from 'config/layouts.json';
// import S from './MobileSlimLayout.module.scss';

const calcCellWidth: CalcCellWidth = calcs => {
    const { layoutWidth, layoutHeight, boardWidth, boardHeight } = calcs;
    const { padding, infoHeight, buttonsMinWidth: buttons } = C.mobile;

    const extraHeight = infoHeight + padding + /* min figure height (2 cells) + */ padding;
    const extraWidth = buttons + padding + /* board + */ padding + buttons;

    const cellWidthFromWidth = (layoutWidth - extraWidth) / boardWidth;
    const cellWidthFromHeight = (layoutHeight - extraHeight) / (boardHeight + 2);

    return Math.min(cellWidthFromWidth, cellWidthFromHeight);
};

const Layout: GameLayout = ({ cellWidth }) => {
    const top = <div>Info</div>;
    const middle = <Board api={puzzle as IGameBoardMerge} cellWidth={cellWidth} />;

    return <MobileGameLayout api={puzzle as IGameStage & IGameActions} top={top} middle={middle} />;
};

const MobileSlimLayout = {
    calcCellWidth,
    Layout
};

export default MobileSlimLayout;
