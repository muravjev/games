import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';

import Tetris from '/public/images/tetris.svg';
import Academy from '/public/images/academy-logo.svg';
import Link from 'controls/Link';

import S from './LayoutLogo.module.scss';

export default function LayoutLogo() {
    const router = useRouter();
    const theme = useTheme();
    const color = theme.palette.primary.contrastText;

    const styles = {
        fill: color,
        stroke: color,
        strokeWidth: '.2'
    };

    const logo = (
        <>
            <div className={S.tetris}>
                <Tetris {...styles} />
            </div>
            <div className={S.a}>
                <Academy />
            </div>
        </>
    );

    const isHomePage = router.pathname === '/[locale]';
    const content = isHomePage ? logo : <Link href="/">{logo}</Link>;

    return <div className={S.logo}>{content}</div>;
}
