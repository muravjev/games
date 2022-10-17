import type { ComponentType } from 'react';
import type { FallbackCallbacks } from '@muravjev/features-fallback';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import pageSlice from 'features/page/pageSlice';
import localeSlice from 'features/locale/localeSlice';
import themeSlice from 'features/theme/themeSlice';
import userSlice from 'features/user/userSlice';
import puzzleSlice from 'components/puzzle/puzzleSlice';
import playSlice from 'components/play/playSlice';

// const slices = [pageSlice, localeSlice, themeSlice, userSlice, puzzleSlice, playSlice];
// const reducer = slices.reduce((p, s) => ((p[s.name] = s.reducer), p), {} as Record<string, any>);

const reducer = {
    [pageSlice.name]: pageSlice.reducer,
    [localeSlice.name]: localeSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [puzzleSlice.name]: puzzleSlice.reducer,
    [playSlice.name]: playSlice.reducer
};

export const store = configureStore({ reducer });

export function withStore<T extends object>(
    Component: ComponentType<T>,
    { resolve }: FallbackCallbacks
) {
    return function StoreHoc(props: T) {
        console.log('with store');
        resolve('store');

        return (
            <Provider store={store}>
                <Component {...props} />
            </Provider>
        );
    };
}
