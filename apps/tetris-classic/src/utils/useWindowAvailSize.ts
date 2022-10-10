import { useEffect, useState } from 'react';
import equal from 'fast-deep-equal';

export type WindowAvailSize = {
    availWidth: number;
    availHeight: number;
};

function getWindowAvailSize(): WindowAvailSize | null {
    if (typeof window === 'undefined') return null;
    return {
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight
    };
}

export function useWindowAvailSize() {
    const [availSize, setAvailSize] = useState<WindowAvailSize | null>(null);
    useEffect(() => {
        function updateAvailSize() {
            const newAvailSize = getWindowAvailSize();
            if (newAvailSize != null && !equal(availSize, newAvailSize)) {
                console.log(
                    '. availSize %cdetected %c%s',
                    'color:springgreen',
                    'font-weight:bold',
                    `avail: ${newAvailSize.availWidth}x${newAvailSize.availHeight}`
                );
                setAvailSize(newAvailSize);
            }
        }
        updateAvailSize();
        window.addEventListener('resize', updateAvailSize);
        return () => window.removeEventListener('resize', updateAvailSize);
    }, [availSize]);
    return availSize;
}
