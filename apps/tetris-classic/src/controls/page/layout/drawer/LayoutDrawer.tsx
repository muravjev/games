import type { PropsWithChildren } from 'react';

import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from 'features/hooks';
import { selectPageDrawer, closeDrawer, EDrawer } from 'features/page/pageSlice';

import DrawerSlider from './slider/DrawerSlider';
import DrawerPicker from './picker/DrawerPicker';
import DrawerBackdrop from './backdrop/DrawerBackdrop';

type LayoutDrawerProps = PropsWithChildren<{
    id: EDrawer;
}>;

export default function LayoutDrawer({ id, children }: LayoutDrawerProps) {
    const dispatch = useAppDispatch();
    const drawer = useAppSelector(selectPageDrawer);
    const isOpened = drawer === id;

    const { t } = useTranslation('common');
    const caption = t(`${id}-caption`);

    const close = () => dispatch(closeDrawer());

    return (
        <>
            <DrawerSlider isOpened={isOpened}>
                <DrawerPicker caption={caption}>{children}</DrawerPicker>
            </DrawerSlider>
            <DrawerBackdrop isOpened={isOpened} close={close}></DrawerBackdrop>
        </>
    );
}
