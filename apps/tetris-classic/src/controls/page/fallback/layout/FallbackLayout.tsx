import type { PropsWithChildren } from 'react';

import PageBounds from 'controls/page/_/bounds/PageBounds';

import S from './FallbackLayout.module.scss';

export default function FallbackLayout({ children }: PropsWithChildren) {
    return (
        <main className={S.main}>
            <PageBounds>{children}</PageBounds>
        </main>
    );
}
