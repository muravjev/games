import { forwardRef, Ref } from 'react';
import { NextLink, NextProps } from './NextLink';
import { Button, ButtonProps } from '@mui/material';

type E = HTMLButtonElement;
type P = NextProps<E, ButtonProps>;

const MuiButtonLink = forwardRef<E, P>(
    ({ href, as, prefetch, locale, ...props }: P, ref: Ref<E>) => {
        return (
            <NextLink href={href} as={as} prefetch={prefetch} locale={locale}>
                <Button ref={ref} {...props} />
            </NextLink>
        );
    }
);

export default MuiButtonLink;
