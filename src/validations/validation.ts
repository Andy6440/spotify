
import { Request, Response, NextFunction } from 'express'
import ValidationError from '../models/errors/ValidationError.'

// Extract a parameter value from a request
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
// Middleware for validating a required parameter
export const validateRequiredParam = (paramName: string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const param = extractParamValue(req, paramName)
        if (!param) {
            return next (new ValidationError(`Required parameter "${paramName}" is missing`))
        }  
        next()
    }
}

// Middleware for validating an number parameter
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

// Middleware for validating an string parameter
export const validateStringParam = (paramName: string) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const paramValue = extractParamValue(req, paramName) 
        // Verificar si el valor del parámetro es una cadena válida
        if (typeof paramValue !== 'string') {
            return next(new ValidationError(`${paramName}: Invalid type, expected string`))
        }  
        // Si llegamos aquí, el valor del parámetro es una cadena válida
        next()
    }
}

// Middleware for validating an array of string parameter
export const validateArrayParam = (paramName: string) => {
   
    return (req: Request, _res: Response, next: NextFunction) => {
        const paramValue =req.body ? req.body[paramName] : null 
        if(typeof paramValue !== 'object'     ){
            return next(new ValidationError(`${paramName}: Invalid Type : expected an array`))
        }
        let regex=null
        let error=null
        if(paramName ===  'tracks'){
            regex = /"uri":\s*"spotify:track:[a-zA-Z0-9]{22}"/g
            const matches = JSON.stringify(paramValue).match(regex)
            if( matches && matches.length !== paramValue.length){
                error = true
            }
        }else{
            switch (paramName) {
            case 'uris':
                regex = /^spotify:track:[a-zA-Z0-9]{22}$/
                break
            
            default:
                regex =  /^spotify:artist:[a-zA-Z0-9]{22}$/
            } 
            
            if (typeof paramValue !== 'object' || regex && !regex.test(paramValue)) {
                error = true
            }   
        }

        if(error){
            return next(new ValidationError(`${paramName}: Invalid Track format in array`))
        }
       
        next()
    }
}