import type { ComponentType, PropsWithChildren } from 'react';
import type { FallbackCallbacks } from 'features/fallback/withFallback';

import { useEffect } from 'react';
import { useAppDispatch } from 'features/hooks';
import { useSdk } from 'features/sdk/withSdk';
import { setupUser } from 'features/user/userSlice';

export function withUser<T extends PropsWithChildren>(
    Component: ComponentType<T>,
    { resolve, reject }: FallbackCallbacks
) {
    return function UserHoc(props: T) {
        console.log('with user');
        const dispatch = useAppDispatch();
        const sdk = useSdk();

        useEffect(() => {
            sdk?.then(api => {
                const user = api.getUser();
                dispatch(setupUser(user));
                resolve('user', `id: ${user.id}, name: ${user.name}`);
            }).catch((e: unknown) => {
                reject('user', e);
            });
        }, [sdk, dispatch]);

        return <Component {...props} />;
    };
}
