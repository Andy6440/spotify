
import { Request, Response,NextFunction } from 'express'
import AuthenticationError from '../models/errors/AuthenticationError'
import UserService from '../services/db/User/User.service'

/**
 * Middleware to handle authentication
 * 
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function to call
 */
const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const id = process.env.USER_ID as string
    // Find the user by ID on the database
    const user = await UserService.findUser(id)
    
    if (user) {
        if (!req.cookies || !req.cookies.access_token) {
            const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
            res.cookie('access_token', user.AccessToken.access_token,{ expires: expiryDate, httpOnly: true })
            res.cookie('user_id', user.id, { expires: expiryDate, httpOnly: true })
            res.cookie('refresh_token', user.AccessToken.refresh_token,{ expires: expiryDate, httpOnly: true })
        }

    }else{
        throw new AuthenticationError('User not found')     
    }

    next()
}

export default authenticationMiddleware