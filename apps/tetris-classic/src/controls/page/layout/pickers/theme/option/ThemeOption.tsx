import { DrawerOptionProps } from 'controls/page/layout/drawer/option/DrawerOption';

import DrawerOption from 'controls/page/layout/drawer/option/DrawerOption';
import S from './ThemeOption.module.scss';

type ThemeOptionProps = DrawerOptionProps;

export default function ThemeOption({ theme, ...props }: ThemeOptionProps) {
    const option = theme.layout.option;
    const palette = theme.palette;

    const background = palette.background.default;
    const border = `1px solid ${option.hover.border}`;

    return (
        <DrawerOption className={S.option} theme={theme} background={background} {...props}>
            <span className={S.name}>{theme.name}</span>
            <span className={S.hues}>
                <div className={S.hue} style={{ border, background: palette.primary.main }} />
                <div className={S.hue} style={{ border, background: palette.background.paper }} />
                <div className={S.hue} style={{ border, background: palette.text.primary }} />
                <div className={S.hue} style={{ border, background: palette.secondary.main }} />
            </span>
        </DrawerOption>
    );
}
