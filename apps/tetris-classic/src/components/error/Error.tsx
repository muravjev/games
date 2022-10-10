import { useTranslation } from 'next-i18next';

import Typography from '@mui/material/Typography';
import MuiButtonLink from 'controls/MuiButtonLink';

import S from './Error.module.scss';

type Props = { error: string };

function Error({ error }: Props) {
    const { t } = useTranslation(error);
    return (
        <div className={S.error}>
            <Typography className={S.message} variant="h5" component="div">
                {t('message')}
            </Typography>

            <MuiButtonLink
                href="/"
                className={S.button}
                variant="contained"
                size="large"
                color="secondary"
            >
                {t('button')}
            </MuiButtonLink>
        </div>
    );
}

export default Error;
