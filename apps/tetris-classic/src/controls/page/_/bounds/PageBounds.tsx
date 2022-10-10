import type { PropsWithChildren } from 'react';

import clsx from 'clsx';
import S from './PageBounds.module.scss';

type PageBoundsProps = PropsWithChildren<{
    type?: 'sides';
}>;

export default function PageBounds({ children, type }: PageBoundsProps) {
    return (
        <div className={S.frame}>
            <div className={clsx(S.content, type === 'sides' ? S.sides : S.all)}>{children}</div>
        </div>
    );
}
