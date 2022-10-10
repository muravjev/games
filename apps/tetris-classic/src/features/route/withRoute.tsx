import type { ComponentType, PropsWithChildren } from 'react';
import type { FallbackCallbacks } from 'features/fallback/withFallback';

import { useRouter } from 'next/router';

export function withRoute<T extends PropsWithChildren>(
    Component: ComponentType<T>,
    { resolve }: FallbackCallbacks
) {
    return function RouteHoc(props: T) {
        const router = useRouter();
        const route = router.route;
        const path = router.asPath;
        const query = JSON.stringify(router.query);
        console.log('%c================================================', 'color:yellow;');
        console.log(
            `%cROUTE %c${path} %croute: ${route}, query: ${query}`,
            'color:yellow',
            'font-weight:bold',
            'color:grey'
        );
        resolve('route');
        return <Component {...props} />;
    };
}
