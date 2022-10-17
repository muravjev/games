import { getStaticPaths, makeStaticProps } from 'features/locale/localeStatic';

import Page from 'controls/page/Page';
import Error from 'components/error/Error';

const getStaticProps = makeStaticProps(['common', 'page-500', 'error-500']);
export { getStaticPaths, getStaticProps };

import { client } from '@muravjev/utils-core';
console.log(client, 'compile 500');

export default function Error500Page() {
    return (
        <Page page="page-500">
            <Error error={'error-500'} />
        </Page>
    );
}
