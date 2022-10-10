import type { UserConfig } from 'next-i18next';

import path from 'path';
import localesConfig from 'config/locales';

type Locales = {
    id: string;
    name: string;
};

export type LocaleConfig = Readonly<{
    locales: Locales[];
    default: string;
    path: string;
}>;

export function getLocales() {
    return localesConfig.locales;
}

export function getLocalePaths() {
    return localesConfig.locales.map(lng => ({
        params: {
            locale: lng.id
        }
    }));
}

export function getLocale(locale: string | string[] | undefined) {
    return locale && typeof locale === 'string' ? locale : localesConfig.default;
}

export function getLocaleUserConfig(): UserConfig {
    return {
        i18n: {
            locales: localesConfig.locales.map(lng => lng.id),
            defaultLocale: localesConfig.default
        },
        localePath: path.resolve(localesConfig.path)
    };
}
