import { SdkProps } from '../withSdk';

const sdk = {
    name: 'vk',
    mess: 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV',
    getUser: () => {
        return { id: '100', name: 'vk' };
    },
    getPreferredMode: () => Promise.resolve('light'),
    getPreferredLocale: () => Promise.resolve('ru')
};

export default function VkSdk({ resolve, reject }: SdkProps) {
    setTimeout(() => {
        resolve(sdk);
    }, 3000);
}
