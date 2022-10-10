import { Theme, ThemeOptions, createTheme } from '@mui/material/styles';
import {
    Theme as ThemeConfig,
    ThemeGame,
    ThemeLayout,
    ThemeLogo,
    ThemeMode,
    ThemePalette
} from './theme';

declare module '@mui/material/styles' {
    export interface Theme extends ThemeConfig {}
    export interface ThemeOptions extends ThemeConfig {}
}

import breakpointsConfig from 'config/breakpoints.json';

export function createAppTheme(
    id: string,
    name: string,
    mode: ThemeMode,
    palette: ThemePalette,
    layout: ThemeLayout,
    logo: ThemeLogo,
    game: ThemeGame
): Theme {
    const themeOptions: ThemeOptions = {
        id,
        name,
        mode,
        palette,
        layout,
        logo,
        game,
        breakpoints: { values: breakpointsConfig.breakpoints },
        typography: {
            fontFamily: ''
        },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true // No more ripple, on the whole application!
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        background: palette.primary.main //< Override AppBar background, otherwise mui adds gradient to the AppBar in Dark mode.
                    }
                }
            }
        }
    };
    return createTheme(themeOptions);
}
