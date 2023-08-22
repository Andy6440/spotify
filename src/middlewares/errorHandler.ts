
import { Request, Response,NextFunction } from 'express'
import AppError from '../models/errors/AppError'

export default function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    console.log('Error capturado:', err)

    let statusCode = 500
    let message = 'Internal Server Error'
    console.log('Error capturado:', err)
    if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    }

    const response = {
        status: 'error',
        statusCode: statusCode,
        message: message
    }

    res.status(statusCode).json(response)
}