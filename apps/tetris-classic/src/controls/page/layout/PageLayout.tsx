import type { PropsWithChildren } from 'react';

import { EDrawer } from 'features/page/pageSlice';

import PageBounds from 'controls/page/_/bounds/PageBounds';
import LayoutToolbar from './bar/LayoutToolbar';
import LayoutMenu from './menu/LayoutMenu';
import LayoutLogo from './logo/LayoutLogo';
import LayoutDrawer from './drawer/LayoutDrawer';
import LayoutToggler from './toggler/LayoutToggler';
import LocalePicker from './pickers/locale/LocalePicker';
import ThemePicker from './pickers/theme/ThemePicker';

import LanguageIcon from '@mui/icons-material/Language';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

import clsx from 'clsx';
import S from './PageLayout.module.scss';

export default function PageLayout({ children }: PropsWithChildren) {
    console.log('%cPage layout', 'color:lightseagreen');
    return (
        <main className={S.main}>
            <div className={clsx(S.header, S.layout)}>
                <LayoutDrawer id={EDrawer.Locale}>
                    <LocalePicker />
                </LayoutDrawer>
                <LayoutDrawer id={EDrawer.Theme}>
                    <ThemePicker />
                </LayoutDrawer>
                <LayoutToolbar>
                    <LayoutMenu />
                    <LayoutLogo />
                    <LayoutToggler id={EDrawer.Locale}>
                        <LanguageIcon />
                    </LayoutToggler>
                    <LayoutToggler id={EDrawer.Theme} edge="end">
                        <FormatPaintIcon />
                    </LayoutToggler>
                </LayoutToolbar>
            </div>
            <PageBounds>{children}</PageBounds>
        </main>
    );
}
