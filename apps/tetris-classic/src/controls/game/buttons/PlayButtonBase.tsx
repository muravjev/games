import type { HTMLAttributes } from 'react';
import type { Thunk } from 'features/hooks';
import type { IGameStage } from 'features/game/game';

import { useAppDispatch } from 'features/hooks';
import { useSounds } from 'features/sounds/withSounds';
import { EStage } from 'features/game/runner/runner';

import ButtonBase from './ButtonBase';

export type PlayButtonProps = {
    api: IGameStage;
};

const LABELS = {
    [EStage.Init]: 'play-start',
    [EStage.Pause]: 'play-resume',
    [EStage.Play]: 'play-pause',
    [EStage.Done]: 'play-again'
} as const;

export const getLabelForStage = (stage: EStage) => LABELS[stage];

type Props = HTMLAttributes<HTMLButtonElement> & { stage: EStage; toggleStage: () => Thunk };

const PlayButtonBase = ({ stage, toggleStage, ...props }: Props) => {
    const dispatch = useAppDispatch();
    const sounds = useSounds();
    const label = getLabelForStage(stage);

    const onClick = () => {
        if (sounds != null && stage === EStage.Init) {
            sounds.warmup().then(() => {
                dispatch(toggleStage());
            });
        } else {
            dispatch(toggleStage());
        }
    };

    return <ButtonBase label={label} onClick={onClick} {...props} />;
};

export default PlayButtonBase;
