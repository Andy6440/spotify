import {  NextFunction, Request, Response} from 'express'
import { getAccessToken, getUser, /* getUser, */ redirectString, refreshAccessToken } from '../services/Spotify/auth'
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
export const refreshToken = async(req: Request, _res: Response, callback: CallableFunction) => {
    try {        
        const  {refresh_token}  = req.cookies
        const token = await refreshAccessToken(refresh_token)
        token.refresh_token = refresh_token
        const profile: Profile = await getUser(token.access_token)
        const user = await UserService.handleUser(profile,token)
        callback(user, 200) 
    } catch (err) {
        callback(new AuthenticationError('An error occurred in login'))
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
            access_token : '',
            refresh_token : '',
            expires_in : 0,
            scope :'',
            token_type: ''
        }
        if (req.cookies.tokens) {
            const { access_token, refresh_token, expires_in, scope, token_type } = req.cookies.tokens
            tokens = {
                access_token,
                refresh_token,
                expires_in,
                scope,
                token_type
            }
        } else {
            const code = req.query.code as string
            //Get access token
            tokens  = await getAccessToken(code) 
            res.cookie('tokens', tokens, { maxAge: 900000, httpOnly: true })
           
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
