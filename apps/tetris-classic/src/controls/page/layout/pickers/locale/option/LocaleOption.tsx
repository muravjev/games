import { useTheme } from '@mui/material/styles';
import { DrawerOptionProps } from 'controls/page/layout/drawer/option/DrawerOption';

import DrawerOption from 'controls/page/layout/drawer/option/DrawerOption';
import S from './LocaleOption.module.scss';

type LocaleOptionProps = {
    name: string;
    flag: JSX.Element;
} & Omit<DrawerOptionProps, 'theme'>;

export default function LocaleOption({ name, flag, ...props }: LocaleOptionProps) {
    const theme = useTheme();

    const style = {
        border: `1px solid ${theme.layout.option.border}`
    };

    return (
        <DrawerOption theme={theme} {...props}>
            <div className={S.flag} style={style}>
                {flag}
            </div>
            <div className={S.name}>{name}</div>
        </DrawerOption>
    );
}
