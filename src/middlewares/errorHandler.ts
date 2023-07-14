
import { Request, Response } from 'express'
import AppError from '../models/errors/AppError'

export default function errorHandler(err: Error, _req: Request, res: Response) {
    let statusCode = 500
    let message = 'Internal Server Error'

    if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    }

    res.status(statusCode).json({
        error: {
            message,
        },
    })
}