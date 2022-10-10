import Button, { ButtonProps } from '@mui/material/Button';
import { Theme } from 'features/theme/theme';

import S from './DrawerOption.module.scss';
import clsx from 'clsx';

export type DrawerOptionProps = {
    theme: Theme;
    background?: string;
    isActive: boolean;
} & ButtonProps;

export default function DrawerOption({
    theme,
    background,
    isActive,
    className,
    ...props
}: DrawerOptionProps) {
    const palette = theme.palette;
    const option = theme.layout.option;

    const style = {
        color: palette.text.primary,
        background: background ?? option.background,
        border: `1px solid ${isActive ? 'transparent' : option.border}`,
        ...(isActive
            ? {
                  //< Use box-shadow instead of outline as Safari wouldn't honor border radius.
                  boxShadow: `0 0 0 4px ${palette.secondary.main}`
              }
            : {
                  '&:hover': {
                      background: background ?? option.hover.background,
                      border: `1px solid ${option.hover.border}`
                  }
              })
    };

    return (
        <Button
            sx={style}
            className={clsx(S.option, className)}
            variant={isActive ? 'text' : 'outlined'}
            {...props}
        />
    );
}
