import { SdkProps } from '../withSdk';

function getPreferMode() {
    return window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

const sdk = {
    name: 'self',
    mess: 'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
    getUser: () => {
        return { id: '100', name: 'self' };
    },
    getPreferredMode: () => Promise.resolve(getPreferMode()),
    getPreferredLocale: () => Promise.resolve('ru')
};

export default function SelfSdk({ resolve, reject }: SdkProps) {
    resolve(sdk);
}
