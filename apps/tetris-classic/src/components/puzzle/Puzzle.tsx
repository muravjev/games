import type { IGameSounds } from 'features/game/sounds/withGameSounds';
import type { IGameActions } from 'features/game/game';

import { useEffect } from 'react';
import { useAppDispatch } from 'features/hooks';

import { withFallback } from '@muravjev/features-fallback';
import { withGameSoundsThunk } from 'features/game/sounds/withGameSounds';
import { withGameKeyboardThunk } from 'features/game/keyboard/withGaneKeyboard';

import { puzzle, initPuzzle } from './puzzleSlice';

import PuzzleLayout from './layouts/PuzzleLayout';

function Fallback() {
    return <h1>Puzzle Fallback</h1>;
}

let started = false;

function Puzzle() {
    console.log('%cPuzzle', 'color:lightseagreen');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!started) {
            started = true;
            dispatch(initPuzzle());
        }
    }, [dispatch]);

    return <PuzzleLayout />;
}

export default withFallback(
    withGameSoundsThunk(puzzle as IGameSounds),
    withGameKeyboardThunk(puzzle as IGameActions)
)(Puzzle, Fallback);
