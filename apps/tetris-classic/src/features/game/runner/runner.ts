import type { Subslice } from '@muravjev/utils-redux-subslice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TState, Dispatch, GetState, Thunk } from 'features/hooks';

import { notNull } from 'utils/typescript';
import { declareSubslice } from '@muravjev/utils-redux-subslice';

export enum EStage {
    Init = 'init',
    Done = 'done',
    Pause = 'pause',
    Play = 'play'
}

type Stage = {
    id: EStage;
    payload?: any;
};

type Phase = {
    id: string;
    payload?: any;
    frames: number; //  -- phase frame delay
    start: number; // -- phase start time
};

type RunnerState = {
    speed: number; // -- fps
    start: number; // -- start time
    shift: number; // -- cumulative time shift (due to pause or rollbacks)
    frame: number; // -- current frame4
    stage: Stage; //  -- current stage
    phase: Phase | null; // -- current phase
};

const initialState: RunnerState = {
    speed: 60,
    start: 0,
    shift: 0,
    frame: 0,
    stage: { id: EStage.Init },
    phase: null
};

export const runnerOptions = declareSubslice({
    name: 'runner',
    initialState,
    selectors: {
        select: state => state,
        selectStage: state => state.stage.id,
        selectPhase: state => {
            return state.stage.id === EStage.Play ? state.phase : null;
        }
    },
    reducers: {
        configured(state, action: PayloadAction<Partial<RunnerState>>) {
            return { ...state, ...action.payload };
        },
        started(state, action: PayloadAction<Partial<RunnerState>>) {
            return { ...state, ...action.payload };
        },
        shiftAdjusted(state, action: PayloadAction<RunnerState['shift']>) {
            return { ...state, shift: state.shift + action.payload };
        },
        stageChanged(state, action: PayloadAction<RunnerState['stage']>) {
            return { ...state, stage: action.payload };
        },
        phaseScheduled(state, action: PayloadAction<Phase>) {
            const phase = action.payload;
            const frame = state.frame + phase.frames;
            return { ...state, frame, phase };
        },
        phaseCancelled(state) {
            const phase = notNull(state.phase, 'phase');
            const frame = state.frame - phase.frames;
            return { ...state, frame };
        },
        phaseDropped(state, action: PayloadAction<number>) {
            const time = action.payload;
            const phase = notNull(state.phase, 'phase');
            const passedTime = time - phase.start;
            const shift = state.shift + passedTime;
            const frame = state.frame - phase.frames;
            return { ...state, shift, frame };
        }
    }
});

export type RunnerEvents_OnPhase = (phase: Phase) => Thunk;

export interface IRunnerEvents {
    onPhase: RunnerEvents_OnPhase;
}

export const createRunner = (Subslice: Subslice<TState, typeof runnerOptions>) => {
    const { select, selectPhase, selectStage } = Subslice.selectors;
    const {
        configured,
        phaseCancelled,
        phaseDropped,
        phaseScheduled,
        shiftAdjusted,
        started,
        stageChanged
    } = Subslice.actions;

    const setupStage = (id: EStage, payload?: number) => (dispatch: Dispatch) => {
        dispatch(stageChanged({ id, payload }));
    };

    const configure = (stage: EStage) => (dispatch: Dispatch) => {
        dispatch(configured({ shift: 0, frame: 0 }));
        dispatch(setupStage(stage));
    };

    let EVENTS: IRunnerEvents | null = null;

    const subsribe = (events: IRunnerEvents) => {
        EVENTS = events;
    };

    // ## PHASES ###############################################

    let TIMER_ID: NodeJS.Timeout | null = null;

    function clearTimer() {
        if (TIMER_ID !== null) {
            clearTimeout(TIMER_ID);
            TIMER_ID = null;
        }
    }

    function schedule() {
        return (dispatch: Dispatch, getState: GetState) => {
            const result = select(getState());
            const { start, shift, speed, frame, stage } = result;
            if (stage.id !== EStage.Play) return;
            const phase = notNull(result.phase, 'phase');
            const frameTime = (frame * 1000) / speed;
            const spentTime = phase.start - start - shift;
            const delay = Math.max(frameTime - spentTime, 0);
            TIMER_ID = setTimeout(() => {
                TIMER_ID = null;
                if (EVENTS) {
                    dispatch(EVENTS.onPhase(phase));
                }
            }, delay);
        };
    }

    const schedulePhase =
        (id: string, frames = 0, payload: any = undefined) =>
        (dispatch: Dispatch) => {
            clearTimer();
            dispatch(phaseScheduled({ id, frames: frames, payload, start: Date.now() }));
            dispatch(schedule());
        };

    const dropPhase = () => (dispatch: Dispatch) => {
        dispatch(phaseDropped(Date.now()));
    };

    // ## STATES ###############################################

    const play = () => (dispatch: Dispatch, getState: GetState) => {
        dispatch(setupStage(EStage.Play));
        const result = select(getState());
        const phase = notNull(result.phase, 'phase');
        const { id, frames, payload } = phase;
        dispatch(schedulePhase(id, frames, payload));
    };

    const onStart = () => (dispatch: Dispatch) => {
        dispatch(started({ start: Date.now() }));
        dispatch<void>(play());
    };

    const onResume = () => (dispatch: Dispatch, getState: GetState) => {
        const { stage } = select(getState());
        const pauseTime = Date.now() - stage.payload;
        dispatch(shiftAdjusted(pauseTime));
        dispatch(play());
    };

    const onPause = () => (dispatch: Dispatch) => {
        clearTimer();
        dispatch(phaseCancelled());
        dispatch(setupStage(EStage.Pause, Date.now()));
    };

    const STAGE_TO_ACTION = {
        [EStage.Init]: onStart,
        [EStage.Done]: onStart,
        [EStage.Pause]: onResume,
        [EStage.Play]: onPause
    } as const;

    const toggleStage = () => (dispatch: Dispatch, getState: GetState) => {
        const { stage } = select(getState());
        const action = STAGE_TO_ACTION[stage.id];
        if (action) dispatch(action());
    };

    return {
        subsribe,
        selectStage,
        selectPhase,
        configure,
        schedulePhase,
        dropPhase,
        toggleStage
    };
};

export type IRunner = ReturnType<typeof createRunner>;
