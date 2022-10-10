import { forwardRef, Ref } from 'react';
import { NextLink, NextProps } from './NextLink';

type E = HTMLAnchorElement;
type P = NextProps<E>;

const Link = forwardRef<E, P>(({ href, as, prefetch, locale, ...props }: P, ref: Ref<E>) => {
    return (
        <NextLink href={href} as={as} prefetch={prefetch} locale={locale}>
            <a ref={ref} {...props} />
        </NextLink>
    );
});

export default Link;
