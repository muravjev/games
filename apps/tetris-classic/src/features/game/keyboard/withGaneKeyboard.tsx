import type { ComponentType, MutableRefObject, PropsWithChildren } from 'react';
import type { Thunk } from 'features/hooks';
import type { IGameActions } from 'features/game/game';
import type { FallbackCallbacks } from 'features/fallback/withFallback';

import { useEffect, useRef } from 'react';
import { useAppDispatch } from 'features/hooks';

type Actions = keyof IGameActions;
type Keys = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | ' ' | 'Z' | 'X';
type Map = Partial<Record<Keys, () => Thunk>>;

const KEY_MAP_DEFAULT: Readonly<Record<Actions, Readonly<Keys[]>>> = {
    moveLeft: ['ArrowLeft'],
    moveRight: ['ArrowRight'],
    rotateLeft: ['Z'],
    rotateRight: ['ArrowUp', 'X'],
    hardDrop: [' '],
    softDropStart: ['ArrowDown'],
    softDropEnd: ['ArrowDown']
} as const;

export function withGameKeyboardThunk(api: IGameActions) {
    return function withKeyboard<T extends PropsWithChildren>(
        Component: ComponentType<T>,
        { resolve }: FallbackCallbacks
    ) {
        return function KeyboardHoc(props: T) {
            console.log('with game keyboard');
            const dispatch = useAppDispatch();
            const keyMapConfig = KEY_MAP_DEFAULT;
            const keyDownMapRef = useRef<Map>({});
            const keyDownOnceMapRef = useRef<Map>({});
            const keyUpMapRef = useRef<Map>({});

            useEffect(() => {
                keyDownMapRef.current = {};
                keyDownOnceMapRef.current = {};
                keyUpMapRef.current = {};
                function getMapfromKey(k: string) {
                    if (k.endsWith('Start')) return keyDownOnceMapRef;
                    if (k.endsWith('End')) return keyUpMapRef;
                    return keyDownMapRef;
                }
                for (const [k, v] of Object.entries(keyMapConfig) as [Actions, Keys[]][]) {
                    const action = api[k];
                    if (!action) continue;
                    const map = getMapfromKey(k).current;
                    v.reduce((prev, key) => ((prev[key] = action), prev), map);
                }
            }, [keyMapConfig]);

            useEffect(() => {
                function process(
                    e: KeyboardEvent,
                    mapRef: MutableRefObject<Map>,
                    allowRepeat = true
                ) {
                    const action = mapRef.current[e.key as Keys];
                    if (!action) return false;
                    if (!allowRepeat && e.repeat) return false;
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch(action());
                    return true;
                }

                function onKeyDown(e: KeyboardEvent) {
                    process(e, keyDownMapRef) || process(e, keyDownOnceMapRef, false);
                }

                function onKeyUp(e: KeyboardEvent) {
                    process(e, keyUpMapRef);
                }

                document.addEventListener('keydown', onKeyDown);
                document.addEventListener('keyup', onKeyUp);
                resolve('game keyboard');
                return () => {
                    document.removeEventListener('keydown', onKeyDown);
                    document.removeEventListener('keyup', onKeyUp);
                };
            }, [dispatch]);

            return <Component {...props} />;
        };
    };
}
