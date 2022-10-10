import { forwardRef, Ref } from 'react';
import { NextLink, NextProps } from './NextLink';
import { IconButton, IconButtonProps } from '@mui/material';

type E = HTMLButtonElement;
type P = NextProps<E, IconButtonProps>;

const IconLink = forwardRef<E, P>(({ href, as, prefetch, locale, ...props }: P, ref: Ref<E>) => {
    return (
        <NextLink href={href} as={as} prefetch={prefetch} locale={locale}>
            <IconButton ref={ref} {...props} />
        </NextLink>
    );
});

export default IconLink;
