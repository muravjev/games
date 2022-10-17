export const isServer = typeof window === 'undefined';
export const isClient = typeof window !== 'undefined';
export const client = isServer ? 'server' : 'client';

export const noop = () => undefined;

export const sleep = (duration: number) => {
    const start = Date.now();
    let end = start;
    while (end < start + duration) {
        end = Date.now();
    }
};

export const delay = async (duration: number) => {
    return new Promise(resolve => setTimeout(resolve, duration));
};
