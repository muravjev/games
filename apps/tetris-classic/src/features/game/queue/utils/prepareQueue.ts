function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min); //< min and max included
}

function getNextFigures(indexes: number[]): number[] {
    const random: number[] = [];
    const source = indexes.slice();
    while (source.length) {
        const rand = randomIntFromInterval(0, source.length - 1);
        random.push(source[rand]);
        source.splice(rand, 1);
    }
    return random;
}

export function prepareQueue(indexes: number[], pending: number[]): number[] {
    return pending.length > 1 ? pending.slice() : [...getNextFigures(indexes), ...pending];
}
