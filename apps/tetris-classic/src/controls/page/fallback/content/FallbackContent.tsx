import PageLogo from 'controls/page/_/logo/PageLogo';

import S from './FallbackContent.module.scss';

export default function FallbackContent() {
    const strokeColor = 'var(--fallback-stroke-color)';
    const strokeWidth = 'var(--fallback-stroke-width)';
    return (
        <div className={S.content}>
            <div className={S.logo}>
                <PageLogo strokeColor={strokeColor} strokeWidth={strokeWidth} />
            </div>
            <div className={S.image}>
                <img width={300} height={300} alt="Tetris Academy" src="/images/tetris.png"></img>
            </div>
        </div>
    );
}
