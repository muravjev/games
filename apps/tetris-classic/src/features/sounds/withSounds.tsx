import type { ComponentType } from 'react';
import type { FallbackCallbacks } from '@muravjev/features-fallback';
import type { ISoundsPlayer } from './useSoundsPlayer';

import { createContext, useContext, useEffect } from 'react';
import { useSoundsPlayer } from './useSoundsPlayer';

import { soundsConfig } from 'config/sounds';

const SoundsContext = createContext<ISoundsPlayer | null>(null);

export function withSounds<T extends object>(
    Component: ComponentType<T>,
    { resolve }: FallbackCallbacks
) {
    return function SoundsHoc(props: T) {
        console.log('with sounds');
        const sounds = useSoundsPlayer(soundsConfig);
        useEffect(() => {
            sounds
                .load()
                .then(() => resolve('sounds'))
                .catch((e: unknown) => {
                    if (e instanceof Error) {
                        console.log('%cSounds error: %s', 'color:red', e.message);
                    }
                    resolve('sounds', 'disabled');
                });
        }, [sounds]);
        return (
            <SoundsContext.Provider value={sounds}>
                <Component {...props} />
            </SoundsContext.Provider>
        );
    };
}

export const useSounds = () => useContext(SoundsContext);
