import type { AppProps } from 'next/app';
import type { SSRConfig as TranslationPageProps } from 'next-i18next';

import { withFallback } from '@muravjev/features-fallback';
import { withRoute } from 'features/route/withRoute';
import { withError } from 'features/error/withError';
import { withSounds } from 'features/sounds/withSounds';
import { withStore } from 'features/store';
import { withSdk } from 'features/sdk/withSdk';
import { withUser } from 'features/user/withUser';
import { withScheme } from 'features/scheme/withScheme';
import { withTheme } from 'features/theme/withTheme';
import { withLocale } from 'features/locale/withLocale';
import { appWithTranslation } from 'next-i18next';

import Head from 'next/head';
import Fallback from 'controls/page/fallback/Fallback';

import 'styles/main.scss';

const HeadViewport = () => (
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
);

const HeadIcons = () => (
    <>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/icons/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
    </>
);

declare type MyAppProps = AppProps<TranslationPageProps>;

function MyApp({ Component, pageProps }: MyAppProps) {
    return (
        <>
            <Head>
                <HeadViewport />
                <HeadIcons />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default withFallback<MyAppProps>(
    withRoute,
    withError,
    withSounds,
    withStore,
    withSdk,
    withUser,
    withScheme,
    withTheme,
    withLocale
)(appWithTranslation(MyApp), Fallback);
