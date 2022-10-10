import type { IGameActions, IGameStage } from 'features/game/game';

import { HardDropButton } from 'controls/game/buttons/mobile/HardDropButton';
import { MoveRightButton } from 'controls/game/buttons/mobile/MoveRightButton';
import { PlayButton } from 'controls/game/buttons/mobile/PlayButton';
import { RotateLeftButton } from 'controls/game/buttons/mobile/RotateLeftButton';

import S from './MobileRightControls.module.scss';

type Props = { api: IGameStage | IGameActions };

export const MobileRight = ({ api }: Props) => {
    return (
        <div className={S.right}>
            <div className={S.play}>
                <PlayButton api={api as IGameStage} />
            </div>
            <div className={S.rotateLeft}>
                <RotateLeftButton api={api as IGameActions} />
            </div>
            <div className={S.moveRight}>
                <MoveRightButton api={api as IGameActions} />
            </div>
            <div className={S.dropDownRight}>
                <HardDropButton api={api as IGameActions} />
            </div>
        </div>
    );
};
