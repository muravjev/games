import type { HTMLAttributes } from 'react';
import type { Thunk } from 'features/hooks';
import type { IGameActions } from 'features/game/game';

import { useAppDispatch } from 'features/hooks';

import ButtonBase from './ButtonBase';

export type ActionButtonProps = {
    api: IGameActions;
};

type Props = HTMLAttributes<HTMLButtonElement> & { label: string; action: () => Thunk };

const ActionButtonBase = ({ label, action, ...props }: Props) => {
    const dispatch = useAppDispatch();
    const onClick = () => dispatch(action());

    return <ButtonBase label={label} onClick={onClick} {...props} />;
};

export default ActionButtonBase;
