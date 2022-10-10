import type { ActionButtonProps } from 'controls/game/buttons/ActionButtonBase';

import ActionButtonBase from 'controls/game/buttons/ActionButtonBase';
import DownloadIcon from '@mui/icons-material/Download';

export const HardDropButton = ({ api }: ActionButtonProps) => {
    return (
        <ActionButtonBase label="hard-drop" action={api.hardDrop}>
            <DownloadIcon />
        </ActionButtonBase>
    );
};
