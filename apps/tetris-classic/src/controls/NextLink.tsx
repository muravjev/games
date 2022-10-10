import type { PropsWithChildren, HTMLAttributes } from 'react';
import type { LinkProps } from 'next/link';

import { useLocaleHref } from 'features/locale/useLocaleHref';

import Link from 'next/link';

type Props = PropsWithChildren<Pick<LinkProps, 'href' | 'as' | 'prefetch' | 'locale'>>;

export type NextProps<TElement, TProps = HTMLAttributes<TElement>> = Props & Omit<TProps, 'href'>;

export function NextLink({ href, as, prefetch, locale, children }: Props) {
    const localeHref = useLocaleHref(
        href.toString(),
        locale === undefined || locale === false ? '' : locale
    );
    return (
        <Link href={localeHref} as={as} prefetch={prefetch} locale={locale} passHref>
            {children}
        </Link>
    );
}
