import Value from './Value';

import { styled } from '@mui/material/styles';
import S from './Digits.module.scss';

const Zero = styled('span')(({ theme }) => ({
    color: theme.layout.option.border,
    border: `1px solid ${theme.layout.option.border}`
}));

const Digit = styled('span')(({ theme }) => ({
    color: theme.game.info.digit.color,
    border: `1px solid ${theme.layout.option.border}`
}));

type Props = {
    value: number;
    length: number;
};

const Digits = ({ value, length }: Props) => {
    const number = value.toString();
    const zeroes = number.length < length ? length - number.length : 0;

    const result = [];

    for (let i = 0; i < zeroes; i++) {
        result.push(
            <Zero key={i} className={S.zero}>
                0
            </Zero>
        );
    }

    for (let i = 0; i < number.length; i++) {
        result.push(
            <Digit key={zeroes + i} className={S.digit}>
                {number[i]}
            </Digit>
        );
    }

    return (
        <Value>
            <div className={S.digits}>{result}</div>
        </Value>
    );
};

export default Digits;
