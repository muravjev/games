import type { ComponentType, PropsWithChildren } from 'react';
import type { Theme } from '@mui/material/styles';
import type { FallbackCallbacks } from 'features/fallback/withFallback';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'features/hooks';
import { useScheme } from 'features/scheme/withScheme';
import { selectThemeChosen, selectThemeThemes, setupThemeChosen } from './themeSlice';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from './createAppTheme';

import createCache from '@emotion/cache';

import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';

const emotionCache = createCache({ key: 'css', prepend: true });

type Props = PropsWithChildren<{ chosen: string }>;

const WithTheme = ({ chosen, children }: Props) => {
    console.log('theme provider +');
    const themes = useAppSelector(selectThemeThemes);
    const { id, name, mode, palette, logo, layout, game } = themes[chosen];
    const theme = createAppTheme(id, name, mode, palette, layout, logo, game);
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider<Theme> theme={theme}>
                <CssBaseline />
                <Head>
                    <meta name="theme-color" content={theme.palette.primary.main} />
                </Head>
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
};

export function withTheme<T extends PropsWithChildren>(
    Component: ComponentType<T>,
    { resolve, reject }: FallbackCallbacks
) {
    return function ThemeHoc(props: T) {
        const dispatch = useAppDispatch();
        const scheme = useScheme();
        const chosen = useAppSelector(selectThemeChosen);
        console.log('with theme %c%s', 'color:grey', chosen);

        useEffect(() => {
            if (scheme !== null && chosen === null) {
                console.log('. with theme %cpending scheme', 'color:grey');
                scheme
                    .then(mode => {
                        const theme = mode == 'dark' ? 'github' : 'classic';
                        dispatch(setupThemeChosen(theme));
                        resolve('theme', theme);
                    })
                    .catch((e: unknown) => {
                        reject('theme', e);
                    });
            }
        }, [scheme, chosen, dispatch]);

        const component = <Component {...props} />;
        return chosen ? <WithTheme chosen={chosen}>{component}</WithTheme> : component;
    };
}
