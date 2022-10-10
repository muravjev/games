import type { ActionButtonProps } from 'controls/game/buttons/ActionButtonBase';

import ActionButtonBase from 'controls/game/buttons/ActionButtonBase';
import RotateRightIcon from '@mui/icons-material/RotateRight';

export const RotateRightButton = ({ api }: ActionButtonProps) => {
    return (
        <ActionButtonBase label="rotate-right" action={api.rotateRight}>
            <RotateRightIcon />
        </ActionButtonBase>
    );
};
