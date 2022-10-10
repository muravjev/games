import type { ComponentType, PropsWithChildren } from 'react';
import type { Device } from 'utils/useDevice';

import { createContext, useContext, useEffect } from 'react';
import { getDevice } from 'utils/useDevice';

const DeviceContext = createContext<Device | null>(null);

let device: Device | null = null;

export function withDevice<T extends PropsWithChildren>(Component: ComponentType<T>) {
    return function DeviceHoc(props: T) {
        console.log(
            'with device %c%s',
            'color:grey;',
            device ? `isTouch:${device.isTouchScreen}, isIphone:${device.isIphone}` : 'null'
        );

        useEffect(() => {
            device = getDevice();
            console.log(
                '. with device %cdetected %c%s',
                'color:springgreen',
                'font-weight:bold',
                `isTouch:${device.isTouchScreen}, isIphone:${device.isIphone}`
            );
        }, []);

        return (
            <DeviceContext.Provider value={device}>
                <Component {...props} />
            </DeviceContext.Provider>
        );
    };
}

export const useDevice = () => useContext<Device | null>(DeviceContext);
