import Tetris from '/public/images/tetris.svg';
import Academy from '/public/images/academy.svg';

import S from './PageLogo.module.scss';

type PageLogoProps = {
    strokeColor: string;
    strokeWidth: string;
};

export default function PageLogo({ strokeColor, strokeWidth }: PageLogoProps) {
    const styles = {
        fill: strokeColor,
        stroke: strokeColor,
        strokeWidth
    };
    return (
        <div className={S.logo}>
            <div className={S.tetris}>
                <Tetris {...styles} />
            </div>
            <div className={S.academy}>
                <Academy />
            </div>
        </div>
    );
}
