
import { Request, Response, NextFunction } from 'express'
import AppError from '../models/errors/AppError'

// Middleware for validating a required parameter
export const validateRequiredParam = (paramName: string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const param = req.query[paramName]
  
        if (!param) {
            next (new AppError(400, `Required parameter "${paramName}" is missing`))
        }
  
        next()
    }
}
  
// Middleware for validating an token
export const validateTokenParam = () => {
    return (_req: Request, _res: Response, next: NextFunction) => {
        const token = process.env.TOKEN || null

        if (typeof token !=='string') {
            next(new AppError(400, 'Invalid email'))
            
        }
        next()
    }
}
// Middleware for validating an number param

export const validateNumberParam = (name:string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const param = req.query ? parseInt(req.query[name] as string) : null
        if (param === null || isNaN(param)) {
            next(new AppError(400, `${name}: Invalid type of number`))
        }
        next()
    }
}
export const validateStringParam = (paramName: string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const paramValue = req.params[paramName]
        // Verificar si el valor del parámetro es una cadena válida
        if (typeof paramValue !== 'string') {
            return next(new AppError(400, `${paramName}: Invalid type, expected string`))
        }
  
        // Si llegamos aquí, el valor del parámetro es una cadena válida
        next()
    }
}