
import { Request, Response, NextFunction } from 'express'
import ValidationError from '../models/errors/ValidationError.'

// Middleware for validating a required parameter
export const validatePlaylistParams = () => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const {name,description} = req.body
        const error = []
        if (!name) {
            error.push('Required parameter  name is missing')
        }else if (typeof name !== 'string') {
            error.push('Name: Invalid type, expected string')
        }
        if (!description) {
            error.push('Required parameter  description is missing')
        }else if (typeof description !== 'string') {
            error.push('Description: Invalid type, expected string')
        }
        if (error.length) {
            return next(new ValidationError(error.join(', ')))
        }
        next()
    }
}
  