import type { PropsWithChildren } from 'react';

import { useTheme } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { useBrowserLayoutEffect } from 'utils/useBrowserLayoutEffect';

import useWindowWidth from 'utils/useWindowWidth';
import useIsWindowResizing from 'utils/useIsWindowResizing';

import S from './DrawerSlider.module.scss';
import C from 'config/zIndexes.json';

type Props = PropsWithChildren<{ isOpened: boolean }>;

export default function DrawerSlider({ isOpened, children }: Props) {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement>(null);

    const [marginTop, setMarginTop] = useState(isOpened ? '0' : '-1000px');
    const isResizing = useIsWindowResizing();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const windowWidth = useWindowWidth(); //< margingTop may have change on window with change.

    useBrowserLayoutEffect(() => {
        if (ref.current !== null) {
            const newMarginTop = isOpened
                ? '0'
                : `${-Math.ceil(ref.current.offsetHeight ?? 0 + 1)}px`;
            if (marginTop !== newMarginTop) {
                setMarginTop(newMarginTop);
            }
        }
    });

    const styles = {
        marginTop: marginTop,
        background: theme.palette.background.default,
        ...(isOpened ? { zIndex: C.zIndexes.layoutSlider } : {}),
        ...(isResizing
            ? {}
            : {
                  transition: theme.transitions.create('margin', {
                      easing: isOpened
                          ? theme.transitions.easing.sharp
                          : theme.transitions.easing.easeOut,
                      duration: isOpened
                          ? theme.transitions.duration.leavingScreen
                          : theme.transitions.duration.enteringScreen
                  })
              })
    };

    return (
        <div className={S.wrapper}>
            <div ref={ref} className={S.slider} style={styles}>
                {children}
            </div>
        </div>
    );
}
