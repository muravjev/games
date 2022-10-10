import type { PropsWithChildren } from 'react';

import S from './Value.module.scss';

const Value = ({ children }: PropsWithChildren) => {
    return <div className={S.value}>{children}</div>;
};

export default Value;
