import type { PlayButtonProps } from 'controls/game/buttons/PlayButtonBase';

import { useTranslation } from 'next-i18next';
import { useAppSelector } from 'features/hooks';
import { getLabelForStage } from 'controls/game/buttons/PlayButtonBase';

import PlayButtonBase from 'controls/game/buttons/PlayButtonBase';

import S from './PlayButton.module.scss';

const PlayButton = ({ api }: PlayButtonProps) => {
    const { t } = useTranslation('game');
    const stage = useAppSelector(api.selectStage);

    const label = getLabelForStage(stage);

    return (
        <PlayButtonBase stage={stage} toggleStage={api.toggleStage} className={S.button}>
            {t(label)}
        </PlayButtonBase>
    );
};

export default PlayButton;
