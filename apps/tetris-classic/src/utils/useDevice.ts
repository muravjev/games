import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

declare global {
    interface Navigator {
        standalone?: boolean;
    }
}

export type Device = {
    isTouchScreen: boolean;
    isIphone: boolean;
    isStandAlone: boolean;
};

export function getDevice(): Device {
    const ua = new UAParser();
    const { type, model } = ua.setUA(window.navigator.userAgent).getDevice();
    const isTablet = type === 'tablet';
    const isMobile = type === 'mobile';
    const isTouchScreen = isMobile || isTablet;
    const isIphone = model === 'iPhone';
    const isStandAlone = ('standalone' in navigator && navigator.standalone) || false;
    return {
        isTouchScreen,
        isIphone,
        isStandAlone
    };
}

let globalDevice: Device | null = null;

export function useDevice() {
    const [device, setDevice] = useState(globalDevice);
    useEffect(() => {
        if (device) return;
        globalDevice = getDevice();
        console.log(
            '. useDevice %cdetected %c%s',
            'color:springgreen',
            'font-weight:bold',
            `isTouch: ${globalDevice.isTouchScreen}, isIphone: ${globalDevice.isIphone}`
        );
        setDevice(globalDevice);
    }, [device]);
    return device;
}
