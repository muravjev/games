import type { TState } from 'features/hooks';
import type { ThemeChosen, ThemeThemes, ThemeValue } from './themeFactory';

import { createSlice } from '@reduxjs/toolkit';
import { createTheme } from './themeFactory';

const name = 'theme';
const initialState = createTheme();

const themeSlice = createSlice({
    name,
    initialState,
    reducers: {
        setupThemeChosen: (state, action) => {
            const chosen = action.payload;
            return { ...state, chosen };
        }
    }
});

export default themeSlice;

export const { setupThemeChosen } = themeSlice.actions;

const selectTheme = (state: TState): ThemeValue => state[name];

export const selectThemeThemes = (state: TState): ThemeThemes => selectTheme(state).themes;
export const selectThemeChosen = (state: TState): ThemeChosen => selectTheme(state).chosen;
