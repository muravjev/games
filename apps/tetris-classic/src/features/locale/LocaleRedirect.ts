import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { selectLocale } from './localeSlice';
import { useAppSelector } from 'features/hooks';

export default function LocaleRedirect() {
    const locale = useAppSelector(selectLocale);
    const router = useRouter();

    useEffect(() => {
        if (router.query.locale !== locale) {
            console.log(`LOCALE REDIRECT: ${locale}`);
            router.replace('/' + locale + router.route);
        }
    });
}
