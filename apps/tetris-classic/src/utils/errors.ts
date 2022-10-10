export class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

export class CustomErrorWithParameter extends Error {
    constructor(message: string, public readonly parameter: any) {
        super(message);
        this.name = 'CustomErrorWithParameter';
    }
}
