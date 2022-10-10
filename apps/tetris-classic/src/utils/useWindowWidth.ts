import { useState } from 'react';
import { useBrowserLayoutEffect } from 'utils/useBrowserLayoutEffect';

type WindowWidth = number;

export default function useWindowWidth(): WindowWidth {
    const [width, setWidth] = useState<WindowWidth>(0);
    useBrowserLayoutEffect(() => {
        const updateWidth = () => setWidth(window.innerWidth);
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);
    return width;
}
