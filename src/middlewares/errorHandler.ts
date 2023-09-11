
import { Request, Response,NextFunction } from 'express'
import AppError from '../models/errors/AppError'

/**
 * Handles errors and sends an appropriate response to the client.
 * @param err - The error object.
 * @param _req - The request object.
 * @param res - The response object.
 * @param _next - The next function.
 */
export default function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    let statusCode = 500 // Default status code for internal server error
    let message = 'Internal Server Error' // Default error message

    // Check if the error is an instance of AppError
    if (err instanceof AppError) {
        statusCode = err.statusCode // Set the status code to the error's status code
        message = err.message // Set the error message
    }

    // Create the response object
    const response = {
        status: 'error',
        statusCode: statusCode,
        message: message
    }

    // Send the response to the client
    res.status(statusCode).json(response)
}
