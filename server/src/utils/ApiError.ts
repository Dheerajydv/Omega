export interface ApiError {
    statusCode: number;
    message: string;
    errors?: any;
}

export class ApiError extends Error {
    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors?: any
    ) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
}
