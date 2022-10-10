import { themes } from 'config/themes';
import { Theme } from './theme';

export type ThemeThemes = Record<string, Theme>;
export type ThemeChosen = string | null;

export type ThemeValue = {
    themes: ThemeThemes;
    chosen: ThemeChosen;
};

export const createTheme = (): ThemeValue => {
    return {
        themes: themes.reduce((themes, theme) => ({ ...themes, [theme.id]: theme }), {}),
        chosen: null
    };
};
