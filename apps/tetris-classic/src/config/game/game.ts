type GameConfig = Readonly<{
    boardSize: {
        boardWidth: number;
        boardHeight: number;
    };
    speed: number;
    moveDelay: number;
    softDelay: number;
    spawnDelay: number;
    lockDelay: number;
    burnDelay: number;
}>;

export const gameConfig: GameConfig = {
    boardSize: {
        boardWidth: 10,
        boardHeight: 20
    },
    speed: 60, //< 60 fps @todo Should we pass it to runner?
    moveDelay: 60, //< frames
    softDelay: 1, //< frames
    spawnDelay: 30, //< frames
    lockDelay: 30, //< frames
    burnDelay: 42 //< frames
};
