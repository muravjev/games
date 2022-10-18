import { getStaticPaths, makeStaticProps } from 'features/locale/localeStatic';

import Page from 'controls/page/Page';
import Home from 'components/home/Home';

const getStaticProps = makeStaticProps(['common', 'page-home', 'menu']);
export { getStaticPaths, getStaticProps };

import { client } from '@muravjev/utils-core';
console.log(client, 'compile home');

export default function HomePage() {
    return (
        <Page page="page-home">
            <Home />
        </Page>
    );
}
