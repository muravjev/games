import type { SyntheticEvent } from 'react';

import { getLocales } from 'features/locale/localeConfig';
import { useAppDispatch } from 'features/hooks';
import { useRouter } from 'next/router';
import { closeDrawer } from 'features/page/pageSlice';

import flags from './flags';

import LocaleOption from './option/LocaleOption';

const locales = getLocales();

export default function LocalePicker() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const currentLocale = router.query.locale;

    const onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
        const locale = e.currentTarget.dataset.id;
        if (locale === currentLocale) return;
        const pathname = router.pathname;
        dispatch(closeDrawer());
        console.log(`PICKER REDIRECT LOCALE: ${locale}`);
        router.push({ pathname, query: { locale } });
    };

    const options = locales.map(({ id, name }) => (
        <LocaleOption
            key={id}
            data-id={id}
            isActive={id === currentLocale}
            flag={flags[id]}
            name={name}
            onClick={onClick}
        />
    ));

    return <>{options}</>;
}
