import { useTheme } from '@mui/material/styles';

import PageLogo from 'controls/page/_/logo/PageLogo';
import Menu from './menu/Menu';

import S from './Home.module.scss';

function Home() {
    const theme = useTheme();
    const strokeColor = theme.logo.color;
    const strokeWidth = theme.mode === 'light' ? '0.6' : '0.2';
    return (
        <div className={S.home}>
            <div className={S.logo}>
                <PageLogo strokeColor={strokeColor} strokeWidth={strokeWidth} />
            </div>
            <div className={S.menu}>
                <Menu />
            </div>
        </div>
    );
}

export default Home;
