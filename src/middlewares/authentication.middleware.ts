
import { Request, Response,NextFunction } from 'express'
import AuthenticationError from '../models/errors/AuthenticationError'
import UserService from '../services/db/User/User.service'

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Verifica si la cookie existe
    if (!req.cookies.access_token) {   
        const id = process.env.USER_ID as string    
        const user = await UserService.findUser(id)
        if(user){
            res.cookie('access_token', user.token, { maxAge: 900000, httpOnly: true })
        }else {
            new AuthenticationError('User not found')
        }
    }       

    next() // Continúa con el siguiente middleware o ruta
}

export default authenticationMiddleware