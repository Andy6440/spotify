
import { Request, Response, NextFunction } from 'express'
import ValidationError from '../models/errors/ValidationError.'

// Middleware for validating a required parameter
export const validatePlaylistParams = () => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const param = req.body
        if (!param.name) {
            next (new ValidationError('Required parameter  name is missing'))
        }
        if (!param.description) {
            next (new ValidationError( 'Required parameter  description is missing'))
        } 
        if (typeof param.name !== 'string') {
            return next(new ValidationError('Name: Invalid type, expected string'))
        }
        if (typeof param.description !== 'string') {
            return next(new ValidationError( 'Description: Invalid type, expected string'))
        }
        next()
    }
}
  