import type { Thunk } from 'features/hooks';
import type { Figure } from 'features/game/game';
import type { Matrix } from 'utils/matrix';
import type { IRunner } from 'features/game/runner/runner';
import type { IFactors } from 'features/game/factors/factors';
import type { IBoard } from 'features/game/board/board';
import type { IFigure } from 'features/game/figure/figure';
import type { IQueue } from 'features/game/queue/queue';
import type { ISounds } from 'features/game/sounds/sounds';

import { EStage } from 'features/game/runner/runner';
import { ESounds } from 'config/sounds';

export enum EPhase {
    Start = 'start',
    Spawn = 'spawn', //     30 frames
    Move = 'move', //       48 - 1 frames (60 - 1)
    Drop = 'drop', //       0 frames
    Lock = 'lock', //       30 frames
    Burn = 'burn', //       42 frames
    Done = 'done'
}

export const createPhases = (
    Runner: IRunner,
    Factors: IFactors,
    Board: IBoard,
    Figure: IFigure,
    Queue: IQueue,
    Sounds: ISounds
) => {
    const scheduleStartPhase: () => Thunk = () => dispatch => {
        dispatch(Runner.schedulePhase(EPhase.Start));
    };

    const scheduleSpawnPhase: (figure: Figure) => Thunk = figure => (dispatch, getState) => {
        const spawnDelay = Factors.selectSpawnDelay(getState());
        dispatch(Runner.schedulePhase(EPhase.Spawn, spawnDelay, figure));
    };

    const scheduleMovePhase: () => Thunk = () => (dispatch, getState) => {
        const moveDelay = Factors.selectMoveDelay(getState());
        dispatch(Runner.schedulePhase(EPhase.Move, moveDelay));
    };

    const scheduleLockPhase: () => Thunk = () => (dispatch, getState) => {
        const lockDelay = Factors.selectLockDelay(getState());
        dispatch(Runner.schedulePhase(EPhase.Lock, lockDelay));
    };

    const scheduleDropPhase: (lines: number) => Thunk = lines => dispatch => {
        dispatch(Runner.schedulePhase(EPhase.Drop, 0, lines));
    };

    const scheduleBurnPhase: (lines: number[]) => Thunk = lines => (dispatch, getState) => {
        const burnDelay = Factors.selectBurnDelay(getState());
        dispatch(Runner.schedulePhase(EPhase.Burn, burnDelay, lines));
    };

    const scheduleDonePhase: () => Thunk = () => dispatch => {
        dispatch(Runner.schedulePhase(EPhase.Done));
    };

    // ##################################################

    const spawn: () => Thunk = () => (dispatch, getState) => {
        const figure = Queue.selectNextFigure(getState());
        if (dispatch(Board.isValidFigurePosition(figure))) {
            dispatch(scheduleSpawnPhase(figure));
        } else {
            dispatch(scheduleDonePhase());
        }
    };

    const move: () => Thunk<boolean> = () => dispatch => {
        const figure = dispatch(Figure.moveDy(1));
        const isSucceded = dispatch(Board.mergeFigure(figure));
        if (isSucceded) {
            dispatch(Figure.moved(figure));
            dispatch(Sounds.update(ESounds.Tick));
            dispatch(scheduleMovePhase());
        }
        return isSucceded;
    };

    const lock: () => Thunk = () => dispatch => {
        dispatch(Board.mergeBoard());
        const lines = dispatch(Board.getCompletedLines());
        if (lines.length > 0) {
            dispatch(scheduleBurnPhase(lines));
        } else {
            dispatch(spawn());
        }
    };

    const drop: (lines: number) => Thunk<boolean> = lines => dispatch => {
        const figure = dispatch(Figure.moveDy(lines));
        const isSucceded = dispatch(Board.mergeFigure(figure));
        if (isSucceded) {
            dispatch(Figure.moved(figure));
            dispatch(Sounds.update(ESounds.Drop));
            dispatch(scheduleLockPhase());
        }
        return isSucceded;
    };

    // ##################################################

    const start: (stage: EStage) => Thunk = stage => dispatch => {
        dispatch(Factors.applySpawn(true));
        dispatch(Runner.configure(stage));
        dispatch(scheduleStartPhase());
    };

    // ## HANDLERS ################################################

    const onStart: (board?: Matrix) => Thunk = board => dispatch => {
        dispatch(Board.configure(board));
        dispatch(spawn());
    };

    const onSpawn: (figure: Figure) => Thunk = figure => dispatch => {
        dispatch(Queue.advance());
        dispatch(Figure.spawned(figure));
        dispatch(Board.mergeFigure(figure));
        dispatch(Factors.applySpawn(false));
        dispatch(Factors.applySoft(false));
        dispatch(Sounds.update(ESounds.Tick));
        dispatch(scheduleMovePhase());
    };

    const onMove: () => Thunk<boolean> = () => dispatch => {
        if (dispatch(move())) return true;
        dispatch(scheduleLockPhase());
        return false;
    };

    const onDrop: (lines: number) => Thunk<boolean> = lines => dispatch => {
        return dispatch(drop(lines));
    };

    const onLock: () => Thunk<boolean> = () => dispatch => {
        if (dispatch(move())) return false;
        dispatch(lock());
        return true;
    };

    const onBurn: (lines: number[]) => Thunk = lines => dispatch => {
        dispatch(Sounds.update(ESounds.Burn));
        dispatch(Board.removeLines(lines));
        dispatch(spawn());
    };

    const onDone: () => Thunk = () => dispatch => {
        dispatch(Sounds.update(ESounds.Done));
        dispatch(start(EStage.Done));
    };

    return {
        start,
        scheduleMovePhase,
        scheduleDropPhase,
        onStart,
        onSpawn,
        onMove,
        onDrop,
        onLock,
        onBurn,
        onDone
    };
};

export type IPhases = ReturnType<typeof createPhases>;
