import type { ComponentType, PropsWithChildren } from 'react';
import type { FallbackCallbacks } from '@muravjev/features-fallback';
import type { TState } from 'features/hooks';
import type { SoundsState } from './sounds';

import { useEffect, useRef } from 'react';
import { useAppSelector } from 'features/hooks';
import { useSounds } from 'features/sounds/withSounds';

export interface IGameSounds {
    selectSound: (state: TState) => SoundsState;
}

const Player = ({ selectSound }: IGameSounds) => {
    const sounds = useSounds();
    const sound = useAppSelector(selectSound);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        if (sounds !== null && sound && sound.id) {
            sounds.play(sound.id);
        }
    }, [sound, sounds]);

    return null;
};

export function withGameSoundsThunk(api: IGameSounds) {
    return function withGameSounds<T extends PropsWithChildren>(
        Component: ComponentType<T>,
        { resolve }: FallbackCallbacks
    ) {
        return function GameSoundsHoc(props: T) {
            console.log('with game sounds');

            useEffect(() => {
                resolve('game sounds');
            }, []);

            return (
                <>
                    <Player selectSound={api.selectSound} />
                    <Component {...props} />
                </>
            );
        };
    };
}
