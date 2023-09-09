export interface ErrorResponse {
    code: string;
    data: any;
    message: string;
}

export interface ImportErrorResponse {
    id: number;
    error: ErrorResponse;
}