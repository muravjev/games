import type { ComponentType } from 'react';
import type { FallbackCallbacks } from '@muravjev/features-fallback';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function withError<T extends object>(
    Component: ComponentType<T>,
    { resolve }: FallbackCallbacks
) {
    return function ErrorHoc(props: T) {
        const router = useRouter();
        const locale = router.query.locale ?? 'en';
        const route = `/${locale}/500/`;
        console.log('with error %c%s', 'color:grey', route);

        useEffect(() => {
            function onError() {
                console.log('ERROR REDIRECT:', route);
                router.replace(route);
                return true;
            }

            window.addEventListener('error', onError);
            resolve('error');
            return () => window.removeEventListener('error', onError);
        }, [route, router]);

        return <Component {...props} />;
    };
}
