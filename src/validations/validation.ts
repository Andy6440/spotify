
import { Request, Response, NextFunction } from 'express'
import ValidationError from '../models/errors/ValidationError.'

/**
 * Extracts the value of a parameter from the request.
 * 
 * @param req - The Express request object.
 * @param paramName - The name of the parameter to extract.
 * @returns The value of the parameter or null if not found.
 */
const extractParamValue = (req: Request, paramName: string): any => {
    if(req.query[paramName] !== undefined){
        return req.query[paramName]
    }else if(req.body[paramName] !== undefined){
        return req.body[paramName]
    }else if(req.params[paramName] !== undefined){
        return req.params[paramName]
    }
    return null
}
/**
 * Middleware to validate the presence of a required parameter in the request.
 * 
 * @param paramName - The name of the required parameter.
 * @returns Middleware function.
 */
export const validateRequiredParam = (paramName: string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const param = extractParamValue(req, paramName)
        if (!param) {
            return next (new ValidationError(`Required parameter "${paramName}" is missing`))
        }  
        next()
    }
}

/**
 * Middleware to validate that a parameter in the request is a valid number.
 * 
 * @param name - The name of the parameter to validate.
 * @returns Middleware function.
 */
export const validateNumberParam = (name:string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        let param = extractParamValue(req, name)  
        param= parseInt(param)
        if (param === null || isNaN(param)) {
            return next(new ValidationError( `${name}: Invalid type of number`))
        }
        next()
    }
}
/**
 * Middleware to validate that a parameter in the request is a valid string.
 * 
 * @param paramName - The name of the parameter to validate.
 * @returns Middleware function.
 */
export const validateStringParam = (paramName: string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const paramValue = extractParamValue(req, paramName) 
        if (typeof paramValue !== 'string') {
            return next(new ValidationError(`${paramName}: Invalid type, expected string`))
        }  
        next()
    }
}

/**
 * Middleware to validate that a parameter in the request is a valid array.
 * 
 * @param paramName - The name of the parameter to validate.
 * @returns Middleware function.
 */
export const validateArrayParam = (paramName: string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const paramValue = req.body ? req.body[paramName] : null
        
        if (typeof paramValue !== 'object') {
            return next(new ValidationError(`${paramName}: Invalid Type: expected an array`))
        }
        
        let regex = null
        let error = null
        
        if (paramName === 'tracks') {
            regex = /"uri":\s*"spotify:track:[a-zA-Z0-9]{22}"/g
            const matches = JSON.stringify(paramValue).match(regex)
            
            if (matches && matches.length !== paramValue.length) {
                error = true
            }
        } else {
            switch (paramName) {
            case 'uris':
                regex = /^spotify:track:[a-zA-Z0-9]{22}$/
                break
                
            default:
                regex = /^spotify:artist:[a-zA-Z0-9]{22}$/
            } 
            
            if (typeof paramValue !== 'object' || regex && !regex.test(paramValue)) {
                error = true
            }   
        }

        if (error) {
            return next(new ValidationError(`${paramName}: Invalid Track format in array`))
        }
       
        next()
    }
}
