
export class  GymIsOutOfCheckInRangeError extends Error {
    constructor() {
        super('Gym is out of check-in range');
    }
}