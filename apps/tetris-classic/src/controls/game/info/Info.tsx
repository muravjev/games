import type { IGameInfoScore } from './score/Score';
import type { IGameInfoLines } from './lines/Lines';
import type { IGameInfoLevel } from './level/Level';
import type { IGameInfoNext } from './next/Next';

import Score from './score/Score';
import Lines from './lines/Lines';
import Level from './level/Level';
import Next from './next/Next';

export type IGameInfo = IGameInfoScore & IGameInfoLines & IGameInfoLevel & IGameInfoNext;

export type InfoStyles = Record<'info' | 'score' | 'lines' | 'level' | 'next', string>;

type InfoProps = {
    api: IGameInfo;
    cellWidth: number;
};

const Info =
    (S: InfoStyles) =>
    ({ api, cellWidth }: InfoProps) => {
        return (
            <div className={S.info}>
                <div className={S.score}>
                    <Score api={api} />
                </div>
                <div className={S.lines}>
                    <Lines api={api} />
                </div>
                <div className={S.level}>
                    <Level api={api} />
                </div>
                <div className={S.next}>
                    <Next api={api} cellWidth={cellWidth} />
                </div>
            </div>
        );
    };

export default Info;
