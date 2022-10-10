import { useEffect, useState } from 'react';

type WindowOrientation = {
    isLandscape: boolean;
};

export function useWindowOrientation(): WindowOrientation | null {
    const [orientation, setOrientation] = useState<WindowOrientation | null>(null);
    useEffect(() => {
        const landscape = window.matchMedia('(orientation: landscape)');
        function updateOrientation(e?: MediaQueryListEvent) {
            console.log('useWindowOrientation', e);
            setOrientation({ isLandscape: e?.matches ?? false });
        }
        updateOrientation();
        landscape.addEventListener('change', updateOrientation);
        return landscape.removeEventListener('change', updateOrientation);
    }, []);
    return orientation;
}
