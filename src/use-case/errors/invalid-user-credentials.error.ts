
export class InvalidUserCredentialsError extends Error {
    constructor() {
        super('Invalid user credentials.');
    }
}