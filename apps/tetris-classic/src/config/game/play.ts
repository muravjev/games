type PlayConfig = Readonly<{
    scoreBurned: number[]; //< per burned lines
    scoreSoftDrop: number; //< per line
    scoreHardDrop: number; //< per line
    nextLevel: number; //< lines before next level
}>;

export const playConfig: PlayConfig = {
    scoreBurned: [0, 40, 100, 300, 1200],
    scoreSoftDrop: 1,
    scoreHardDrop: 2,
    nextLevel: 3
};
