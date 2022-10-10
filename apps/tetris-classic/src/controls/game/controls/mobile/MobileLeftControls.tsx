import type { IGameActions } from 'features/game/game';

import { MoveLeftButton } from 'controls/game/buttons/mobile/MoveLeftButton';
import { RotateRightButton } from 'controls/game/buttons/mobile/RotateRightButton';
import { SoftDropButton } from 'controls/game/buttons/mobile/SoftDropButton';

import S from './MobileLeftControls.module.scss';

type Props = { api: IGameActions };

export const MobileLeft = ({ api }: Props) => {
    return (
        <div className={S.left}>
            <div className={S.rotateRight}>
                <RotateRightButton api={api} />
            </div>
            <div className={S.moveLeft}>
                <MoveLeftButton api={api} />
            </div>
            <div className={S.softDrop}>
                <SoftDropButton api={api} />
            </div>
        </div>
    );
};
