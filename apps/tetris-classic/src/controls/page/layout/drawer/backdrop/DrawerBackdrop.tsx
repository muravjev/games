import type { SyntheticEvent } from 'react';

import S from './DrawerBackdrop.module.scss';

type DrawerBackdrop = {
    isOpened: boolean;
    close: () => void;
};

export default function DrawerBackdrop({ isOpened, close }: DrawerBackdrop) {
    const onClick = (e: SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault(); //< first close opened drawer
        close();
    };
    return isOpened ? <div className={S.backdrop} onClick={onClick} onTouchEnd={onClick} /> : null;
}
