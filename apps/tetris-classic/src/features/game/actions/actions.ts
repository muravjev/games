import type { Thunk } from 'features/hooks';
import type { IRunner } from 'features/game/runner/runner';
import type { IFactors } from 'features/game/factors/factors';
import type { IBoard } from 'features/game/board/board';
import type { IFigure } from 'features/game/figure/figure';
import type { ISounds } from 'features/game/sounds/sounds';
import type { IPhases } from 'features/game/phases/phases';

import { EPhase } from 'features/game/phases/phases';
import { ESounds } from 'config/sounds';

type Phase = {
    id: string;
    payload?: unknown;
};

export const createActions = (
    Phases: IPhases,
    Runner: IRunner,
    Factors: IFactors,
    Board: IBoard,
    Figure: IFigure,
    Sounds: ISounds
) => {
    type PhaseToAction = Partial<Record<EPhase, (payload?: any) => Thunk>>;

    const process: (actions: PhaseToAction, payload?: any) => Thunk =
        (actions, payload) => (dispatch, getState) => {
            const phase = Runner.selectPhase(getState());
            if (phase === null) return;
            const action = actions[phase.id as EPhase];
            if (action) {
                dispatch(action(payload ?? phase));
            } else {
                dispatch(Sounds.update(ESounds.Error));
            }
        };

    const moveDx: (dx: number) => Thunk = dx => dispatch => {
        const figure = dispatch(Figure.moveDx(dx));
        const isSucceeded = dispatch(Board.mergeFigure(figure));
        if (isSucceeded) {
            dispatch(Figure.moved(figure));
        }
        dispatch(Sounds.update(isSucceeded ? ESounds.Move : ESounds.Error));
    };

    const MOVE = {
        [EPhase.Move]: moveDx,
        [EPhase.Lock]: moveDx
    };

    const rotate: (clockwise: boolean) => Thunk = clockwise => dispatch => {
        const figure = dispatch(Figure.rotate(clockwise));
        const isSucceeded = dispatch(Board.mergeFigure(figure));
        if (isSucceeded) {
            dispatch(Figure.rotated(figure));
        }
        dispatch(Sounds.update(isSucceeded ? ESounds.Move : ESounds.Error));
    };

    const ROTATE = {
        [EPhase.Move]: rotate,
        [EPhase.Lock]: rotate
    };

    const dropMove: (phase: Phase) => Thunk = phase => (dispatch, getState) => {
        const figure = Figure.select(getState());
        const lines = dispatch(Board.getFigureDropDistance(figure));
        if (lines > 0) {
            dispatch(Runner.dropPhase());
            dispatch(Phases.scheduleDropPhase(lines));
        } else {
            dispatch(dropSpawn(phase));
        }
    };

    const dropSpawn: (phase: Phase) => Thunk = phase => dispatch => {
        dispatch(Factors.applySpawn(true));
        dispatch(Runner.dropPhase());
        dispatch(Runner.schedulePhase(phase.id, 0, phase.payload));
    };

    const HARD_DROP = {
        [EPhase.Move]: dropMove,
        [EPhase.Lock]: dropSpawn,
        [EPhase.Burn]: dropSpawn,
        [EPhase.Spawn]: dropSpawn
    };

    const softDrop: (start: boolean) => Thunk = start => dispatch => {
        dispatch(Factors.applySoft(start));
        dispatch(Runner.dropPhase());
        dispatch(Phases.scheduleMovePhase());
    };

    const SOFT_DROP = {
        [EPhase.Move]: softDrop
    };

    return {
        moveLeft: () => process(MOVE, -1),
        moveRight: () => process(MOVE, 1),
        rotateLeft: () => process(ROTATE, false),
        rotateRight: () => process(ROTATE, true),
        hardDrop: () => process(HARD_DROP),
        softDropStart: () => process(SOFT_DROP, true),
        softDropEnd: () => process(SOFT_DROP, false)
    };
};
