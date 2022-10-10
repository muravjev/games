import { useState } from 'react';
import { useBrowserLayoutEffect } from 'utils/useBrowserLayoutEffect';
import equal from 'fast-deep-equal';

type WindowSize = [number, number];

function getWindowSize(): WindowSize | null {
    if (typeof window === 'undefined') return null;
    return [window.innerWidth, window.innerHeight];
}

export function useWindowSize(): WindowSize | null {
    const [size, setSize] = useState<WindowSize | null>(null);
    useBrowserLayoutEffect(() => {
        const updateSize = () => {
            const newSize = getWindowSize();
            if (!equal(size, newSize)) {
                setSize(newSize);
            }
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}
