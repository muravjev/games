import Script from 'next/script';
import { ISdk, ISdkUser, SdkProps } from '../withSdk';

declare global {
    interface Window {
        YaGames: any;
    }
}

interface IYaGames {}

class YandexSdkImpl implements ISdk {
    constructor(private readonly api: IYaGames, public readonly name: string) {}
    public mess: string = 'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY';
    getUser: () => ISdkUser = () => ({ id: '200', name: 'yandex' });
    getPreferredMode: () => Promise<string> = () => Promise.resolve('light');
    getPreferredLocale: () => Promise<string> = () => Promise.resolve('ru');
}

export default function YandexSdk({ resolve, reject }: SdkProps) {
    const onLoad = () => {
        console.log('yandex loaded');
        window.YaGames.init()
            .then((ysdk: IYaGames) => {
                const sdk = new YandexSdkImpl(ysdk, 'yandex');
                console.log('yandex inited');
                resolve(sdk);
            })
            .catch((e: unknown) => reject(e));
    };
    const onError = reject;
    return (
        <Script
            src={process.env.NEXT_PUBLIC_YANDEX_SDK}
            strategy="afterInteractive"
            onLoad={onLoad}
            onError={onError}
        />
    );
}
