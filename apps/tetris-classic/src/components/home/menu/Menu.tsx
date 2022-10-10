import { useEffect } from 'react';
import { MenuButton } from './button/MenuButton';

import clsx from 'clsx';
import S from './Menu.module.scss';

let isFirstMount: boolean = true;

export default function Menu() {
    useEffect(() => {
        return () => {
            isFirstMount = false;
        };
    }, []);
    return (
        <div className={clsx(S.menu, isFirstMount && S.animate)}>
            <MenuButton label="learn" className={S.learn} href="/play" />
            <MenuButton label="play" className={S.play} href="/play" />
            <MenuButton label="puzzle" className={S.puzzle} href="/puzzle" />
            <MenuButton label="settings" className={S.settings} href="/play" />
        </div>
    );
}
