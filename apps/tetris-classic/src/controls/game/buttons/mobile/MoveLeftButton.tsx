import type { ActionButtonProps } from 'controls/game/buttons/ActionButtonBase';

import ActionButtonBase from 'controls/game/buttons/ActionButtonBase';
import WestIcon from '@mui/icons-material/West';

export const MoveLeftButton = ({ api }: ActionButtonProps) => {
    return (
        <ActionButtonBase label="move-left" action={api.moveLeft}>
            <WestIcon />
        </ActionButtonBase>
    );
};
