import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import IconLink from 'controls/IconLink';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import S from './LayoutMenu.module.scss';

export default function LayoutMenu() {
    const { t } = useTranslation('common');
    const router = useRouter();
    if (router.pathname === '/[locale]') return null;

    const label = t('menu');

    return (
        <IconLink href="/" className={S.menu} aria-label={label} edge="start" color="inherit">
            <ArrowBackIcon />
        </IconLink>
    );
}
