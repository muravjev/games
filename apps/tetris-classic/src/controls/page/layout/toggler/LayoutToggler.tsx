import type { IconButtonProps } from '@mui/material/IconButton';

import { useTranslation } from 'next-i18next';
import { useAppDispatch } from 'features/hooks';
import { EDrawer, openDrawer } from 'features/page/pageSlice';

import IconButton from '@mui/material/IconButton';

type LayoutTogglerProps = {
    id: EDrawer;
} & IconButtonProps;

export default function LayoutToggler({ id, ...props }: LayoutTogglerProps) {
    const dispatch = useAppDispatch();

    const { t } = useTranslation('common');
    const label = t(`${id}-label`);

    const open = () => dispatch(openDrawer(id));

    return <IconButton color="inherit" onClick={open} aria-label={label} {...props} />;
}
