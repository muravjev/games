import type { IGameSounds } from 'features/game/sounds/withGameSounds';
import type { IGameActions } from 'features/game/game';

import { useEffect } from 'react';
import { useAppDispatch } from 'features/hooks';

import { withFallback } from 'features/fallback/withFallback';
import { withGameSoundsThunk } from 'features/game/sounds/withGameSounds';
import { withGameKeyboardThunk } from 'features/game/keyboard/withGaneKeyboard';

import { play, initPlay } from './playSlice';

import PlayLayout from './layouts/PlayLayout';

function Fallback() {
    return <h1>Play Fallback</h1>;
}

let started = false;

function Play() {
    console.log('%Play', 'color:lightseagreen');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!started) {
            started = true;
            dispatch(initPlay());
        }
    }, [dispatch]);

    return <PlayLayout />;
}

export default withFallback(
    withGameSoundsThunk(play as IGameSounds),
    withGameKeyboardThunk(play as IGameActions)
)(Play, Fallback);
