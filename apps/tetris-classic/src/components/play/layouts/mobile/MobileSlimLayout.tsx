import type { CalcCellWidth, GameLayout } from 'controls/game/layout/GameLayout';

import { play } from 'components/play/playSlice';

import MobileGameLayout from 'controls/game/layout/mobile/MobileGameLayout';
import Board from 'controls/game/board/Board';
import InfoSlim from 'controls/game/info/InfoSlim';

import C from 'config/layouts.json';

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
    const top = <InfoSlim api={play} cellWidth={cellWidth} />;
    const middle = <Board api={play} cellWidth={cellWidth} />;

    return <MobileGameLayout api={play} top={top} middle={middle} />;
};

const MobileSlimLayout = {
    calcCellWidth,
    Layout
};

export default MobileSlimLayout;
