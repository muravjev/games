import type { Thunk } from 'features/hooks';
import type { IGameBoardSize } from 'features/game/game';
import type { IGameBoardMerge } from 'features/game/game';
import type { IGameActions, IGameStage } from 'features/game/game';
import type { IGameSounds } from 'features/game/sounds/withGameSounds';
import type { IGameInfoScore } from 'controls/game/info/score/Score';
import type { IGameInfoLines } from 'controls/game/info/lines/Lines';
import type { IGameInfoLevel } from 'controls/game/info/level/Level';
import type { IGameInfoNext } from 'controls/game/info/next/Next';

import { createSubslices } from '@muravjev/utils-redux-subslice';
import { createBoardConfig, boardConfigOptions } from 'features/game/board/boardConfig';
import { createQueueConfig, queueConfigOptions } from 'features/game/queue/queueConfig';
import { createFactorsConfig, factorsConfigOptions } from 'features/game/factors/factorsConfig';

import { createBoard, boardOptions } from 'features/game/board/board';
import { createQueue, queueOptions } from 'features/game/queue/queue';
import { createFactors, factorsOptions } from 'features/game/factors/factors';
import { createFigure, figureOptions } from 'features/game/figure/figure';
import { createRunner, runnerOptions, EStage } from 'features/game/runner/runner';
import { createSounds, soundsOptions } from 'features/game/sounds/sounds';
import { createPhases } from 'features/game/phases/phases';
import { createActions } from 'features/game/actions/actions';
import { createPlayProcessor, playProcessorOptions } from './playProcessor';

const [playSlice, subslices] = createSubslices(
    'play',
    boardConfigOptions,
    queueConfigOptions,
    factorsConfigOptions,

    boardOptions,
    queueOptions,
    factorsOptions,
    figureOptions,
    runnerOptions,
    soundsOptions,

    playProcessorOptions
);

export default playSlice;

const {
    boardConfigSubslice,
    queueConfigSubslice,
    factorsConfigSubslice,

    boardSubslice,
    queueSubslice,
    factorsSubslice,
    figureSubslice,
    runnerSubslice,
    soundsSubslice,

    processorSubslice
} = subslices;

const BoardConfig = createBoardConfig(boardConfigSubslice);
const QueueConfig = createQueueConfig(queueConfigSubslice);
const FactorsConfig = createFactorsConfig(factorsConfigSubslice);

const Board = createBoard(boardSubslice, BoardConfig);
const Queue = createQueue(queueSubslice, BoardConfig, QueueConfig);
const Factors = createFactors(factorsSubslice, FactorsConfig);
const Figure = createFigure(figureSubslice);
const Runner = createRunner(runnerSubslice);
const Sounds = createSounds(soundsSubslice);
const Phases = createPhases(Runner, Factors, Board, Figure, Queue, Sounds);
const Actions = createActions(Phases, Runner, Factors, Board, Figure, Sounds);
const Processor = createPlayProcessor(processorSubslice, Phases, Factors);

Runner.subsribe(Processor);

export const initPlay: () => Thunk = () => dispatch => {
    dispatch(Board.configure());
    dispatch(Queue.configure());
    dispatch(Factors.configure());
    dispatch(Phases.start(EStage.Init));
};

type IPlay = IGameStage &
    IGameActions &
    IGameSounds &
    IGameBoardSize &
    IGameBoardMerge &
    IGameInfoScore &
    IGameInfoLines &
    IGameInfoLevel &
    IGameInfoNext;

export const play: IPlay = {
    selectStage: Runner.selectStage,
    toggleStage: Runner.toggleStage,

    selectSound: Sounds.select,

    moveLeft: Actions.moveLeft,
    moveRight: Actions.moveRight,
    rotateLeft: Actions.rotateLeft,
    rotateRight: Actions.rotateRight,
    hardDrop: Actions.hardDrop,
    softDropStart: Actions.softDropStart,
    softDropEnd: Actions.softDropEnd,

    selectBoardSize: Board.selectBoardSize,
    selectMerge: Board.selectMerge,

    selectInfoScore: Processor.selectScore,
    selectInfoLines: Processor.selectLines,
    selectInfoLevel: Processor.selectLevel,
    selectInfoNext: Queue.selectNextCutted
};
