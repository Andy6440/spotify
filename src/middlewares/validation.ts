
import { Request, Response, NextFunction } from 'express'
import ValidationError from '../models/errors/ValidationError.'

// Middleware for validating a required parameter
export const validateRequiredParam = (paramName: string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const param = req.query[paramName]  
        if (!param) {
            next (new ValidationError(`Required parameter "${paramName}" is missing`))
        }  
        next()
    }
}
  
// Middleware for validating an token
export const validateTokenParam = () => {
    return (_req: Request, _res: Response, next: NextFunction) => {
        const token = process.env.TOKEN || null
        if (typeof token !=='string') {
            next(new ValidationError( 'Invalid email'))            
        }
        next()
    }
}

// Middleware for validating an spotify user id
export const validateSpotifyUserId = () => {
    return (_req: Request, _res: Response, next: NextFunction) => {
        const userId = process.env.USER_ID || null
        if (typeof userId !=='string') {
            next(new ValidationError( 'Invalid spotify user id'))
            
        }
        next()
    }
}

// Middleware for validating an number parameter
export const validateNumberParam = (name:string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        let param = null  
        if(req?.query[name]!== undefined && req?.query[name]!==null ){
            param= parseInt(req.query[name] as string)
        }else if(req.body[name]!== undefined  &&  req?.body[name]!==null){
            console.log('body',req.body[name])
            param =parseInt(req.body[name])
        }
        if (param === null || isNaN(param)) {
            next(new ValidationError( `${name}: Invalid type of number`))
        }
        next()
    }
}

// Middleware for validating an string parameter
export const validateStringParam = (paramName: string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        let paramValue = null
        if(req?.query[paramName]!== undefined && req?.query[paramName]!==null ){
            paramValue= req.query[paramName] as string
        }else if(req.body[paramName]!== undefined  &&  req?.body[paramName]!==null){
            paramValue= req.body[paramName] as string
        }else if(req.params[paramName]!== undefined  &&  req?.params[paramName]!==null){
            paramValue= req.params[paramName] as string
        }
        // Verificar si el valor del parámetro es una cadena válida
        if (typeof paramValue !== 'string') {
            return next(new ValidationError(`${paramName}: Invalid type, expected string`))
        }  
        // Si llegamos aquí, el valor del parámetro es una cadena válida
        next()
    }
}

// Middleware for validating an array of string parameter
export const validateArrayUriParam = (paramName: string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const paramValue =req.body ? req.body[paramName] : null
        // Verificar si el valor del parámetro es una array válida
        let regex =  null
        switch (paramName) {
        case 'tracks':
            regex = /^spotify:track:[a-zA-Z0-9]{22}$/
            break

        default:
            regex =  /^spotify:artist:[a-zA-Z0-9]{22}$/
        }
        if (typeof paramValue !== 'object' || regex && !regex.test(paramValue)) {
            return next(new ValidationError( `${paramName}: Invalid Type : expected array of string like spotify:track:`))
        }  
        // Si llegamos aquí, el valor del parámetro es una cadena válida
        next()
    }
}

// Middleware for validating an array of string parameter
export const validateArrayTracksParam = (paramName: string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const paramValue =req.body ? req.body[paramName] : null      
        const regex = /"uri":\s*"spotify:track:[a-zA-Z0-9]{22}"/g
        const matches = JSON.stringify(paramValue).match(regex)
        if( matches && matches.length !== paramValue.length){
            return next(new ValidationError(`${paramName}: Invalid Type : expected array of string like spotify:track:`))
        }
        next()
    }
}