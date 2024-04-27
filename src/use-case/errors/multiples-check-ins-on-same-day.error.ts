
export class MultiplesCheckInsOnSameDayError extends Error {
    constructor() {
        super('Only one check in per day allowed');
    }
}