
import { Request, Response, NextFunction } from 'express'
import AppError from '../models/errors/AppError'

// Middleware for validating a required parameter
export const createPlaylistParams = () => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const param = req.body
        if (!param.name) {
            next (new AppError(400, 'Required parameter  name is missing'))
        }
        if (!param.description) {
            next (new AppError(400, 'Required parameter  description is missing'))
        } 
        if (typeof param.name !== 'string') {
            return next(new AppError(400, 'Name: Invalid type, expected string'))
        }
        if (typeof param.description !== 'string') {
            return next(new AppError(400, 'Description: Invalid type, expected string'))
        }
        next()
    }
}
  