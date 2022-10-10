import type { PropsWithChildren } from 'react';

import { useTranslation } from 'next-i18next';
import { styled } from '@mui/material/styles';

import Caption from 'controls/game/info/_/Caption';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

import S from './Hints.module.scss';

const StyledKey = styled('div')(({ theme }) => ({
    color: theme.palette.text.primary,
    border: `1px solid ${theme.layout.option.border}`
}));

const Key = ({ children }: PropsWithChildren) => (
    <StyledKey className={S.button}>{children}</StyledKey>
);

const Item = ({ label, children }: PropsWithChildren<{ label: string }>) => {
    const { t } = useTranslation('game');
    return (
        <div className={S.line}>
            {children}
            <div className={S.label}>{t(label)}</div>
        </div>
    );
};

const Hints = () => {
    const { t } = useTranslation('game');
    return (
        <div className={S.help}>
            <Caption text="control" />
            <Item label="move-left">
                <Key>
                    <WestIcon />
                </Key>
            </Item>
            <Item label="move-right">
                <Key>
                    <EastIcon />
                </Key>
            </Item>
            <Item label="rotate-right">
                <Key>
                    <NorthIcon />
                </Key>
            </Item>
            <Item label="rotate-left">
                <Key>Z</Key>
            </Item>
            <Item label="soft-drop">
                <Key>
                    <SouthIcon />
                </Key>
            </Item>
            <Item label="hard-drop">
                <Key>{t('control-space')}</Key>
            </Item>
        </div>
    );
};

export default Hints;
