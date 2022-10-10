import type { Select } from 'features/hooks';

import { useAppSelector } from 'features/hooks';

import Caption from '../_/Caption';
import Digits from '../_/Digits';

export interface IGameInfoLevel {
    selectInfoLevel: Select<number>;
}

type Props = {
    api: IGameInfoLevel;
};

const Level = ({ api }: Props) => {
    const level = useAppSelector(api.selectInfoLevel);
    return (
        <>
            <Caption text="level" />
            <Digits value={level} length={2} />
        </>
    );
};

export default Level;
