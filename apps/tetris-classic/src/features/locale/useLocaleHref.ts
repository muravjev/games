import { useRouter } from 'next/router';

export function useLocaleHref(targetHref: string, targetLocale: string): string {
    const router = useRouter();

    const href = targetHref || router.asPath;
    if (href.startsWith('http')) {
        return href;
    }

    const locale = targetLocale || (router.query.locale as string);
    if (locale) {
        return href ? `/${locale}${href}` : router.pathname.replace('[locale]', locale);
    }

    return href;
}
