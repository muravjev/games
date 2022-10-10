import { GetStaticProps, GetStaticPropsContext, PreviewData } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ParsedUrlQuery } from 'querystring';
import { getLocale, getLocalePaths, getLocaleUserConfig } from './localeConfig';

export const getStaticPaths = async () => {
    return {
        paths: getLocalePaths(),
        fallback: false
    };
};

async function getI18nProps<
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
>(context: GetStaticPropsContext<Q, D>, ns = ['common']) {
    const contextLocale = context?.params?.locale;
    const locale = getLocale(contextLocale);
    const config = getLocaleUserConfig();
    return await serverSideTranslations(locale, ns, config);
}

export function makeStaticProps(ns: string[] = []): GetStaticProps {
    return async function getStaticProps(context) {
        return {
            props: await getI18nProps(context, ns)
        };
    };
}
