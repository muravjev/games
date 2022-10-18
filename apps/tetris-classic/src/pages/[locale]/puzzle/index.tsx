import { getStaticPaths, makeStaticProps } from 'features/locale/localeStatic';

import Page from 'controls/page/Page';
import Puzzle from 'components/puzzle/Puzzle';

import { client } from '@muravjev/utils-core';
console.log(client, 'compile puzzle');

const getStaticProps = makeStaticProps(['common', 'page-puzzle', 'game']);
export { getStaticPaths, getStaticProps };

export default function PlayPage() {
    return (
        <Page page="page-puzzle">
            <Puzzle />
        </Page>
    );
}
