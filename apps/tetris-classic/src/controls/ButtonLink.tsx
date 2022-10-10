import { forwardRef, Ref } from 'react';
import { NextLink, NextProps } from './NextLink';

type E = HTMLButtonElement;
type P = NextProps<E>;

const ButtonLink = forwardRef<E, P>(({ href, as, prefetch, locale, ...props }: P, ref: Ref<E>) => {
    return (
        <NextLink href={href} as={as} prefetch={prefetch} locale={locale}>
            <button ref={ref} {...props} />
        </NextLink>
    );
});

export default ButtonLink;
