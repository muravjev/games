import { SimplePaletteColorOptions, TypeBackground, TypeText } from '@mui/material';

export type ThemeMode = string;

export type ThemeLogo = {
    color: string;
};

export type ThemeLayout = {
    option: {
        background: string; // paper
        border: string; // divider
        hover: {
            background: string;
            border: string;
        };
    };
};

export type ThemeGame = {
    info: {
        caption: {
            background: string;
            color: string;
        };
        digit: {
            color: string;
        };
    };
};

export type ThemePalette = {
    primary: SimplePaletteColorOptions;
    secondary: SimplePaletteColorOptions;
    background: TypeBackground;
    text: Partial<TypeText> & Pick<TypeText, 'primary'>;
};

export type Theme = {
    id: string;
    name: string;
    palette: ThemePalette;
    mode: ThemeMode;
    logo: ThemeLogo;
    layout: ThemeLayout;
    game: ThemeGame;
};
