export class ApiError extends Error {
    constructor({error_data}) {
        super(error_data.error_code + ': ' +error_data.error_msg);
        this.name = 'ApiError';
    }
}