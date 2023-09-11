
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
    if (!req.cookies.access_token) {
        
        const id = process.env.USER_ID as string
        // Find the user by ID on the database
        const user = await UserService.findUser(id)

        if (user) {
            // Set the access token cookie
            res.cookie('access_token', user.token, { maxAge: 900000, httpOnly: true })
        } else {
            throw new AuthenticationError('User not found')
        }
    }       

    next()
}

export default authenticationMiddleware