import type { HTMLProps } from 'react';

import { useTranslation } from 'next-i18next';
import { styled } from '@mui/material/styles';

import S from './ButtonBase.module.scss';
import clsx from 'clsx';

const Styled = styled('button')(({ theme }) => ({
    color: theme.palette.text.primary,
    background: theme.layout.option.background,
    border: `1px solid ${theme.layout.option.border}`
}));

type ButtonProps = {
    label: string;
} & Omit<HTMLProps<HTMLButtonElement>, 'as' | 'type'>;

const ButtonBase = ({ label, className = undefined, ...props }: ButtonProps) => {
    const { t } = useTranslation('game');
    return <Styled aria-label={t(label)} className={clsx(S.button, className)} {...props} />;
};

export default ButtonBase;
