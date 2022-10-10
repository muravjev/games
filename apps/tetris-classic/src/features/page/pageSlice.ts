import type { TState } from 'features/hooks';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

export enum EDrawer {
    Theme = 'theme',
    Locale = 'locale'
}

type Page = {
    drawer: EDrawer | null;
};

const name = 'page';
const initialState: Page = { drawer: null };

const pageSlice = createSlice({
    name,
    initialState,
    reducers: {
        openDrawer(state, action: PayloadAction<EDrawer>) {
            return { ...state, drawer: action.payload };
        },
        closeDrawer(state) {
            return { ...state, drawer: null };
        }
    }
});

export default pageSlice;

export const { openDrawer, closeDrawer } = pageSlice.actions;

const selectPage = (state: TState) => state[name];

export const selectPageDrawer = (state: TState) => selectPage(state).drawer;
