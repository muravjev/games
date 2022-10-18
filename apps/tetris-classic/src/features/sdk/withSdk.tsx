import type { ComponentType } from 'react';
import type { FallbackCallbacks } from '@muravjev/features-fallback';

import { createContext, useContext } from 'react';
import { createDeferred } from '@muravjev/utils-core';

import dynamic from 'next/dynamic';

export interface ISdkUser {
    id: string;
    name: string;
}

export interface ISdk {
    name: string;
    mess: string;
    getUser: () => ISdkUser;
    getPreferredMode: () => Promise<string>;
    getPreferredLocale: () => Promise<string>;
}

const SdkContext = createContext<Promise<ISdk> | null>(null);
const SdkPromise = createDeferred<ISdk>();

export interface SdkProps {
    resolve: (sdk: ISdk) => void;
    reject: (e: any) => void;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_SDK: string;
        }
    }
}

const Sdk: ComponentType<SdkProps> = dynamic(() => import(process.env.NEXT_PUBLIC_SDK), {
    ssr: false
});

export function withSdk<T extends object>(
    Component: ComponentType<T>,
    { resolve, reject }: FallbackCallbacks
) {
    return function SdkHoc(props: T) {
        console.log('with sdk');
        const onResolve = (sdk: ISdk) => {
            SdkPromise.resolve(sdk);
            resolve('sdk', sdk.name);
        };
        const onReject = (e: unknown) => {
            SdkPromise.reject(e);
            reject('sdk', e);
        };
        return (
            <SdkContext.Provider value={SdkPromise.promise}>
                <Sdk resolve={onResolve} reject={onReject} />
                <Component {...props} />
            </SdkContext.Provider>
        );
    };
}

export const useSdk = () => useContext(SdkContext);
