import {  NextFunction, Request, Response} from 'express'
import { getAccessToken, getUser, /* getUser, */ redirectString } from '../services/Spotify/auth'
import AuthenticationError from '../models/errors/AuthenticationError'
import { AccessToken, Profile } from '../interfaces/User'
import UserService from '../services/db/User/User.service'


/**
 * Clears the 'code' cookie and redirects the user to Spotify's authorization page.
 * @param _req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export const login = (_req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('code')

    try {
        const query = redirectString()
        const path = `https://accounts.spotify.com/authorize?${query.param}`
        res.redirect(path)
    } catch (err) {
        next(new AuthenticationError('An error occurred in login'))
    }
}


/**
 * Handle the callback from the API.
 * 
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function
 */
export const callback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let tokens: AccessToken = {
            access_token: '',
            refresh_token: ''
        }

        if (req.cookies.tokens) {
            tokens = req.cookies
        } else {
            const code = req.query.code as string
            //Get access token
            tokens = await getAccessToken(code)
        }

        //Get user profile
        const profile: Profile = await getUser(tokens.access_token)
        //Save user in DB
        const user = await UserService.handleUser(profile, tokens)
        //Send user profile
        res.send(user)
    } catch (err) {
        next(new AuthenticationError('An error occurred in callback'))
    }
}
/**
 * Handler function for retrieving user profile.
 * 
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function
 */
export const UserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get access token from cookies
        const { access_token } = req.cookies

        // Get user profile
        const profile: Profile = await getUser(access_token)

        // Send user profile
        res.send(profile)
    } catch (err) {
        next(new AuthenticationError('An error occurred in callback'))
    }
}
