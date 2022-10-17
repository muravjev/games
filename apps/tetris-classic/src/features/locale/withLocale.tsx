import type { ComponentType } from 'react';
import type { FallbackCallbacks } from '@muravjev/features-fallback';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'features/hooks';
import { useRouter } from 'next/router';
import { useSdk } from 'features/sdk/withSdk';
import { selectLocale, setupLocale } from './localeSlice';

//< @todo Current locale should be taken from sdk
export function withLocale<T extends object>(
    Component: ComponentType<T>,
    { resolve }: FallbackCallbacks
) {
    return function LocaleHoc(props: T) {
        const sdk = useSdk();
        const dispatch = useAppDispatch();
        const storeLocale = useAppSelector(selectLocale);
        const router = useRouter();
        const routeLocale = router.query.locale;

        console.log('with locale %c%s - %s', 'color:grey', storeLocale, routeLocale);

        useEffect(() => {
            function updateLocale(locale: string | null) {
                if (locale !== null && storeLocale !== locale) {
                    console.log(
                        '. with locale %cupdated: %c%s',
                        'color:springgreen',
                        'font-weight:bold',
                        locale
                    );
                    dispatch(setupLocale(locale));
                }
            }

            if (routeLocale && typeof routeLocale === 'string') {
                updateLocale(routeLocale);
                resolve('locale', routeLocale);
                return;
            }

            if (storeLocale) {
                resolve('locale', storeLocale);
                return;
            }

            console.log(`. with locale %cpending sdk`, 'color:grey');
            sdk?.then(api => api.getPreferredLocale()).then(sdkLocale => {
                updateLocale(sdkLocale);
                resolve('locale', sdkLocale);
            });
        }, [sdk, storeLocale, routeLocale, dispatch]);

        return <Component {...props} />;
    };
}
