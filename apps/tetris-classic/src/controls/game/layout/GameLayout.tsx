import type { GameLayoutCalcs } from 'controls/game/useLayoutCalcs';
import type { GameBoardSize, IGameBoardSize } from 'features/game/game';

import { useRef } from 'react';
import { useAppSelector } from 'features/hooks';
import { useLayoutCalcs } from 'controls/game/useLayoutCalcs';

import S from './GameLayout.module.scss';

export type CalcCellWidth = (calcs: GameLayoutCalcs & GameBoardSize) => number;
export type GameLayout = ({ cellWidth }: { cellWidth: number }) => JSX.Element;

export type LayoutData = {
    calcCellWidth: CalcCellWidth;
    Layout: GameLayout;
};

export type GetLayoutData = (isMobile: boolean, aspectRatio: number) => LayoutData;

function DebugName({ name }: { name: string }) {
    const layoutTrimmed = name.replace(/(Layout$)/, '');
    const splitted = layoutTrimmed.split(/(?=[A-Z])/);
    const joined = splitted.join(' ');
    return <div className={S.debug}>{joined}</div>;
}

type Props = {
    api: IGameBoardSize;
    getLayoutData: GetLayoutData;
};

export default function GameLayout({ api, getLayoutData }: Props) {
    console.log('%cGame layout', 'color:lightseagreen');
    const ref = useRef<HTMLDivElement>(null);
    const calcs = useLayoutCalcs(ref.current);
    const board = useAppSelector(api.selectBoardSize);

    let layout: JSX.Element | null = null;

    if (calcs !== null) {
        const data = getLayoutData(calcs.isMobile, calcs.aspectRatio);
        const cellWidth = data.calcCellWidth({ ...calcs, ...board });
        const Layout = data.Layout;

        layout = (
            <>
                <DebugName name={Layout.name} />
                <Layout cellWidth={cellWidth} />
            </>
        );
    }

    return (
        <div ref={ref} className={S.layout}>
            {layout}
        </div>
    );
}
