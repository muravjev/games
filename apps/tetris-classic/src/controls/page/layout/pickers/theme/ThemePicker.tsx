import type { SyntheticEvent } from 'react';

import { useAppDispatch, useAppSelector } from 'features/hooks';
import { setupThemeChosen, selectThemeThemes, selectThemeChosen } from 'features/theme/themeSlice';
import { closeDrawer } from 'features/page/pageSlice';

import ThemeOption from './option/ThemeOption';

export default function ThemePicker() {
    const dispatch = useAppDispatch();
    const themes = useAppSelector(selectThemeThemes);
    const chosen = useAppSelector(selectThemeChosen);

    const onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
        dispatch(setupThemeChosen(e.currentTarget.dataset.id));
        dispatch(closeDrawer());
    };

    const options = Object.values(themes).map(theme => (
        <ThemeOption
            key={theme.id}
            data-id={theme.id}
            isActive={theme.id === chosen}
            theme={theme}
            onClick={onClick}
        />
    ));

    return <>{options}</>;
}
