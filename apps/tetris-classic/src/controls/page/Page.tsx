import type { PropsWithChildren } from 'react';

import { useTranslation } from 'next-i18next';
import { isServer } from '@muravjev/utils-core';

import Head from 'next/head';
import Fallback from 'controls/page/fallback/Fallback';
import PageLayout from './layout/PageLayout';

type PageProps = PropsWithChildren<{
    page: string;
}>;

function Page({ page, children }: PageProps) {
    console.log('%cPage', 'color:gold');
    const { t } = useTranslation(page);

    const server = <Fallback />;
    const client = <PageLayout>{children}</PageLayout>;
    const content = isServer ? server : client;

    return (
        <>
            <Head>
                <title>{t('title')}</title>
                <meta name="description" content={t('description')} />
            </Head>
            {content}
        </>
    );
}

export default Page;
