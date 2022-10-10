import { MobileLeft } from 'controls/game/controls/mobile/MobileLeftControls';
import { MobileRight } from 'controls/game/controls/mobile/MobileRightControls';

import { IGameActions, IGameStage } from 'features/game/game';

import S from './MobileGameLayout.module.scss';

type Props = {
    api: IGameStage | IGameActions;
    top?: JSX.Element;
    bottom?: JSX.Element;
    middle: JSX.Element;
};

export const MobileGameLayout = ({ api, top, bottom, middle }: Props) => {
    return (
        <section className={S.layout}>
            <div className={S.top}>{top}</div>
            <div className={S.bottom}>{bottom}</div>
            <div className={S.left}>
                <MobileLeft api={api as IGameActions} />
            </div>
            <div className={S.right}>
                <MobileRight api={api} />
            </div>
            <div className={S.middle}>{middle}</div>
        </section>
    );
};

export default MobileGameLayout;
