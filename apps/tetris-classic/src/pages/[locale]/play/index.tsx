import { getStaticPaths, makeStaticProps } from 'features/locale/localeStatic';

import Page from 'controls/page/Page';
import Play from 'components/play/Play';

import { client } from '@muravjev/utils-core';
console.log(client, 'compile play');

const getStaticProps = makeStaticProps(['common', 'page-play', 'game']);
export { getStaticPaths, getStaticProps };

export default function PlayPage() {
    return (
        <Page page="page-play">
            <Play />
        </Page>
    );
}
