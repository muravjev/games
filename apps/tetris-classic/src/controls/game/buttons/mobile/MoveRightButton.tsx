import type { ActionButtonProps } from 'controls/game/buttons/ActionButtonBase';

import ActionButtonBase from 'controls/game/buttons/ActionButtonBase';
import EastIcon from '@mui/icons-material/East';

export const MoveRightButton = ({ api }: ActionButtonProps) => {
    return (
        <ActionButtonBase label="move-right" action={api.moveRight}>
            <EastIcon />
        </ActionButtonBase>
    );
};
