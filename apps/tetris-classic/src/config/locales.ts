import type { LocaleConfig } from 'features/locale/localeConfig';

const locales: LocaleConfig = {
    locales: [
        { id: 'en', name: 'English' },
        { id: 'ru', name: 'Русский' }
    ],
    default: 'en',
    path: './public/locales'
};

export default locales;
