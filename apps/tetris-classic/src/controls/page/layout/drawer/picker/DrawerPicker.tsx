import type { PropsWithChildren } from 'react';

import { useAppDispatch } from 'features/hooks';
import { closeDrawer } from 'features/page/pageSlice';

import PageBounds from 'controls/page/_/bounds/PageBounds';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import S from './DrawerPicker.module.scss';

function CloseButton() {
    const dispatch = useAppDispatch();
    const close = () => dispatch(closeDrawer());
    return (
        <IconButton color="inherit" className={S.close} aria-label="close" onClick={close}>
            <CloseIcon />
        </IconButton>
    );
}

type DrawerPickerProps = PropsWithChildren<{
    caption: string;
}>;

export default function DrawerPicker({ caption, children }: DrawerPickerProps) {
    return (
        <PageBounds>
            <div className={S.wrapper}>
                <Typography className={S.caption} variant="h5" component="h2">
                    {caption}
                </Typography>
                <div className={S.picker}>{children}</div>
                <CloseButton />
            </div>
        </PageBounds>
    );
}
