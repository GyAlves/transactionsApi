
export class  LateCheckInValidationError extends Error {
    constructor() {
        super('Exceeded maximum range for check in validation');
    }
}