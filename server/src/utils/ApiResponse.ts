export interface ApiResponse {
    statusCode: number;
    data?: any | null;
    message: string;
}

export class ApiResponse {
    constructor(
        statusCode: number,
        data: any = null,
        message: string = "Sucess"
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}
