
export class  LateCheckInValidationError extends Error {
    constructor() {
        super('Exceeded maximum 20min range for check in validation');
    }
}