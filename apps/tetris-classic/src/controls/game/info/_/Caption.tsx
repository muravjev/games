import { useTranslation } from 'next-i18next';

import S from './Caption.module.scss';

type Props = { text: string };

const Caption = ({ text }: Props) => {
    const { t } = useTranslation('game');
    const caption = t(text);
    return <div className={S.caption}>{caption}</div>;
};

export default Caption;
