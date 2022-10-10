import type { ActionButtonProps } from 'controls/game/buttons/ActionButtonBase';

import ActionButtonBase from 'controls/game/buttons/ActionButtonBase';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

export const RotateLeftButton = ({ api }: ActionButtonProps) => {
    return (
        <ActionButtonBase label="rotate-left" action={api.rotateLeft}>
            <RotateLeftIcon />
        </ActionButtonBase>
    );
};
