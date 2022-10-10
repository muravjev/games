import { useEffect, useState } from 'react';
import { useDevice, Device } from 'utils/useDevice';
import { useWindowAvailSize, WindowAvailSize } from 'utils/useWindowAvailSize';
import equal from 'fast-deep-equal';

import breakpointsConfig from 'config/breakpoints.json';

export type GameLayoutCalcs = {
    layoutWidth: number;
    layoutHeight: number;
    aspectRatio: number;
    isMobile: boolean;
};

function getLayoutCalcs(
    div: HTMLDivElement,
    availSize: WindowAvailSize,
    device: Device
): GameLayoutCalcs {
    const { isTouchScreen } = device;
    const { availWidth, availHeight } = availSize;

    const layoutElement = div;
    const layoutWidth = layoutElement.clientWidth;
    const layoutHeight = layoutElement.clientHeight;
    const aspectRatio = layoutWidth / layoutHeight;
    const isMobile = isTouchScreen || availWidth < breakpointsConfig.breakpoints.sm;

    return {
        layoutWidth,
        layoutHeight,
        aspectRatio,
        isMobile
    };
}

export function useLayoutCalcs(div: HTMLDivElement | null) {
    const device = useDevice();
    const availSize = useWindowAvailSize();
    const [calcs, setCalcs] = useState<GameLayoutCalcs | null>(null);

    useEffect(() => {
        if (div !== null && availSize !== null && device !== null) {
            const newCalcs = getLayoutCalcs(div, availSize, device);
            if (!equal(calcs, newCalcs)) {
                console.log(
                    '. useLayoutCalcs %cdetected %c%s %c%s',
                    'color:springgreen',
                    'font-weight:bold',
                    `layout: ${newCalcs.layoutWidth}x${newCalcs.layoutHeight}`,
                    'font-weight:bold',
                    `isMobile: ${newCalcs.isMobile}`
                );
                setCalcs(newCalcs);
            }
        }
    }, [div, device, availSize, calcs]);

    return calcs;
}
