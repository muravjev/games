import type { Select } from 'features/hooks';

import { useAppSelector } from 'features/hooks';

import Caption from '../_/Caption';
import Digits from '../_/Digits';

export interface IGameInfoScore {
    selectInfoScore: Select<number>;
}

type Props = {
    api: IGameInfoScore;
};

const Score = ({ api }: Props) => {
    const score = useAppSelector(api.selectInfoScore);
    return (
        <>
            <Caption text="score" />
            <Digits value={score} length={5} />
        </>
    );
};

export default Score;
