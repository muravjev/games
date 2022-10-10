import type { TouchEvent } from 'react';
import type { ActionButtonProps } from 'controls/game/buttons/ActionButtonBase';

import { useAppDispatch } from 'features/hooks';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ButtonBase from 'controls/game/buttons/ButtonBase';

export const SoftDropButton = ({ api }: ActionButtonProps) => {
    const dispatch = useAppDispatch();

    const onTouchStart = () => {
        dispatch(api.softDropStart());
    };

    const onTouchEnd = (e: TouchEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(api.softDropEnd());
    };

    return (
        <ButtonBase label="sotf-drop" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <ArrowDownwardIcon />
        </ButtonBase>
    );
};
