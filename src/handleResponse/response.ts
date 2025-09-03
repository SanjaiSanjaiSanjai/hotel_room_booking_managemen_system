import { Response } from "express"

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    statusCode: number;
}

export function successResponse<T>(res: Response, data: T, message: string , statusCode: number = 200) {
    const response: ApiResponse<T> = {
        success: true,
        data,
        message,
        statusCode
    }

    return res.status(statusCode).json(response)
}

export function sendErrorResponse(res: Response, message: string, statusCode: number = 500) {
    const response: ApiResponse<null> = {
        success: false,
        data: null,
        message,
        statusCode
    }
    return res.status(statusCode).json(response)
}