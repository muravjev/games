import type { Select } from 'features/hooks';

import { useAppSelector } from 'features/hooks';

import Caption from '../_/Caption';
import Digits from '../_/Digits';

export interface IGameInfoLines {
    selectInfoLines: Select<number>;
}

type Props = {
    api: IGameInfoLines;
};

const Lines = ({ api }: Props) => {
    const lines = useAppSelector(api.selectInfoLines);
    return (
        <>
            <Caption text="lines" />
            <Digits value={lines} length={2} />
        </>
    );
};

export default Lines;
