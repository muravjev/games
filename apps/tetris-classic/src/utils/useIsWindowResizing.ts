import { useEffect, useState } from 'react';

const DELAY_BEFORE_RESIZE_CONSIDERED_STOPPED = 400;

type IsWindowResizing = boolean;

export default function useIsWindowResizing(): IsWindowResizing {
    const [isResizing, setIsResizing] = useState<IsWindowResizing>(false);
    useEffect(() => {
        let timerId: NodeJS.Timeout | null = null;
        function updateIsResizing() {
            setIsResizing(true);
            if (timerId != null) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                setIsResizing(false);
            }, DELAY_BEFORE_RESIZE_CONSIDERED_STOPPED);
        }
        window.addEventListener('resize', updateIsResizing);
        return () => window.removeEventListener('resize', updateIsResizing);
    }, []);

    return isResizing;
}
