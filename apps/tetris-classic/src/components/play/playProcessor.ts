import type { Subslice } from '@muravjev/utils-redux-subslice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TState, Thunk } from 'features/hooks';
import type { RunnerEvents_OnPhase } from 'features/game/runner/runner';
import type { IFactors } from 'features/game/factors/factors';
import type { IPhases } from 'features/game/phases/phases';

import { EPhase } from 'features/game/phases/phases';

import { declareSubslice } from '@muravjev/utils-redux-subslice';

const initialState = {
    score: 0,
    lines: 0,
    level: 1
};

export const playProcessorOptions = declareSubslice({
    name: 'processor',
    initialState,
    selectors: {
        selectScore: state => state.score,
        selectLines: state => state.lines,
        selectLevel: state => state.level
    },
    reducers: {
        configured: () => initialState,
        scoreUpdated: (state, action: PayloadAction<number>) => ({
            ...state,
            score: state.score + action.payload
        }),
        linesUpdated: (state, action: PayloadAction<number>) => ({
            ...state,
            lines: state.lines + action.payload
        }),
        levelUpdated: (state, action: PayloadAction<number>) => ({
            ...state,
            level: state.level + action.payload
        })
    }
});

const SCORE_SOFT_DROP = 1; //< Per cell
const SCORE_HARD_DROP = 2; //< Per cell

const LINES_PER_LEVEL = 3;

const DELAY_DECREASE_PER_LEVEL = 5;

export const createPlayProcessor = (
    Subslice: Subslice<TState, typeof playProcessorOptions>,
    Phases: IPhases,
    Factors: IFactors
) => {
    const { selectScore, selectLines, selectLevel } = Subslice.selectors;
    const { configured, scoreUpdated, linesUpdated, levelUpdated } = Subslice.actions;

    // ## SCORING ################################################

    const updateScoreOnMove: () => Thunk = () => (dispatch, getState) => {
        if (Factors.selectSoft(getState())) {
            dispatch(scoreUpdated(SCORE_SOFT_DROP));
        }
    };

    const updateScoreOnDrop: (lines: number) => Thunk = lines => dispatch => {
        dispatch(scoreUpdated(lines * SCORE_HARD_DROP));
    };

    const updateScoreOnBurn: (burned: number) => Thunk = burned => (dispatch, getState) => {
        const level = selectLevel(getState());
        const scoresPerLine = [0, 40, 100, 300, 1200];
        const earned = scoresPerLine[burned] * level;
        dispatch(scoreUpdated(earned));
    };

    // ## LINES ###################################################

    const updateLinesOnBurn: (lines: number) => Thunk = lines => dispatch => {
        dispatch(linesUpdated(lines));
    };

    // ## LEVELS ##################################################

    const updateLevelOnBurn: () => Thunk = () => (dispatch, getState) => {
        const lines = selectLines(getState());
        const level = selectLevel(getState());
        const nextLevel = Math.round(lines / LINES_PER_LEVEL);
        if (nextLevel !== level) {
            dispatch(levelUpdated(nextLevel - level));
            const nextMoveDelay = Math.max(20, 60 - nextLevel * DELAY_DECREASE_PER_LEVEL);
            dispatch(Factors.moveDelayChanged(nextMoveDelay));
        }
    };

    // ## HANDLERS ################################################

    const onStart: () => Thunk = () => dispatch => {
        dispatch(configured());
        dispatch(Phases.onStart());
    };

    const onMove: () => Thunk = () => dispatch => {
        if (dispatch(Phases.onMove())) {
            dispatch(updateScoreOnMove());
        }
    };

    const onDrop: (lines: number) => Thunk = lines => dispatch => {
        if (dispatch(Phases.onDrop(lines))) {
            dispatch(updateScoreOnDrop(lines));
        }
    };

    const onLock: () => Thunk = () => dispatch => {
        if (dispatch(Phases.onLock()) === false) {
            dispatch(updateScoreOnMove());
        }
    };

    const onBurn: (lines: number[]) => Thunk = lines => dispatch => {
        dispatch(Phases.onBurn(lines));
        dispatch(updateLinesOnBurn(lines.length));
        dispatch(updateScoreOnBurn(lines.length));
        dispatch(updateLevelOnBurn());
    };

    const PHASE_TO_ACTION = {
        [EPhase.Start]: onStart,
        [EPhase.Spawn]: Phases.onSpawn,
        [EPhase.Move]: onMove,
        [EPhase.Drop]: onDrop,
        [EPhase.Lock]: onLock,
        [EPhase.Burn]: onBurn,
        [EPhase.Done]: Phases.onDone
    };

    const onPhase: RunnerEvents_OnPhase = phase => dispatch => {
        const action = PHASE_TO_ACTION[phase.id as EPhase];
        if (action) {
            dispatch(action(phase.payload));
        }
    };

    return {
        onPhase,
        selectScore,
        selectLines,
        selectLevel
    };
};
