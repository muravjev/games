import type { TState } from 'features/hooks';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

type Locale = { current: string | null };

const name = 'locale';
const initialState: Locale = { current: null };

const localeSlice = createSlice({
    name,
    initialState,
    reducers: {
        setupLocale: (state, action: PayloadAction<string>) => {
            return { current: action.payload };
        }
    }
});

export default localeSlice;

export const { setupLocale } = localeSlice.actions;

export const selectLocale = (state: TState) => state[name].current;
