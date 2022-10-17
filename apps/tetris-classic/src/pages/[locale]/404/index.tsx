import { getStaticPaths, makeStaticProps } from 'features/locale/localeStatic';

import Page from 'controls/page/Page';
import Error from 'components/error/Error';

const getStaticProps = makeStaticProps(['common', 'page-404', 'error-404']);
export { getStaticPaths, getStaticProps };

import { client } from '@muravjev/utils-core';
console.log(client, 'compile 404');

export default function Error404Page() {
    return (
        <Page page="page-404">
            <Error error={'error-404'} />
        </Page>
    );
}
