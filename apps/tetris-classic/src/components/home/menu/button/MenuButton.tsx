import { useTranslation } from 'next-i18next';

import ButtonLink from 'controls/ButtonLink';
import { HTMLAttributes } from 'react';

import clsx from 'clsx';
import S from './MenuButton.module.scss';

type Props = HTMLAttributes<HTMLButtonElement> & { label: string; href: string };

export function MenuButton({ label, className, ...props }: Props) {
    const { t } = useTranslation('menu');
    return (
        <ButtonLink aria-label={t(label)} className={clsx(S.button, className)} {...props}>
            {t(label)}
        </ButtonLink>
    );
}
