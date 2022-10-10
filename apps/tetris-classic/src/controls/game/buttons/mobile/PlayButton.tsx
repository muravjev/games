import type { PlayButtonProps } from 'controls/game/buttons/PlayButtonBase';

import { useAppSelector } from 'features/hooks';
import { EStage } from 'features/game/runner/runner';

import PlayButtonBase from 'controls/game/buttons/PlayButtonBase';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export const PlayButton = ({ api }: PlayButtonProps) => {
    const stage = useAppSelector(api.selectStage);
    const icon = stage === EStage.Play ? <PauseIcon /> : <PlayArrowIcon />;

    return (
        <PlayButtonBase stage={stage} toggleStage={api.toggleStage}>
            {icon}
        </PlayButtonBase>
    );
};
