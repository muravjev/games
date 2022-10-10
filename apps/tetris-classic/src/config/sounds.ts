export enum ESounds {
    Tick = 'tick',
    Move = 'move',
    Rotate = 'rotate',
    Drop = 'drop',
    Error = 'error',
    Burn = 'burn',
    Level = 'level',
    Done = 'done'
}

type SoundsConfig = Readonly<Record<ESounds, string>>;

export const soundsConfig: SoundsConfig = {
    [ESounds.Tick]: '/sounds/tick.mp3',
    [ESounds.Move]: '/sounds/move.mp3',
    [ESounds.Rotate]: '/sounds/rotate.mp3',
    [ESounds.Drop]: '/sounds/drop.mp3',
    [ESounds.Error]: '/sounds/error.mp3',
    [ESounds.Burn]: '/sounds/burn.mp3',
    [ESounds.Level]: '/sounds/level.mp3',
    [ESounds.Done]: '/sounds/done.mp3'
};
