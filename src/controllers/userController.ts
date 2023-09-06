import {  NextFunction, Request, Response } from 'express'
import { getAccessToken, getUser, redirectString } from '../services/Spotify/auth'
import AuthenticationError from '../models/errors/AuthenticationError'
import { AccessToken, Profile } from '../interfaces/User'
import UserService from '../services/db/User/User.service'


export const login = (_req:Request,res :Response,next:NextFunction) =>{
    res.clearCookie('code')
    try {
        const query = redirectString()
        const path  = `https://accounts.spotify.com/authorize?${query.param}`
        res.redirect(path)
    } catch ( err) {
        next(new AuthenticationError('An error occurred in login'))
    }
}
export const callback = async(req:Request,res :Response,next:NextFunction) =>{
   
    try {
        let tokens :AccessToken = {
            access_token:'',
            refresh_token:''
        }

        if(req.cookies.user.tokens){
            tokens = req.cookies.user.tokens
        }else{
            const code = req.query.code as string
            tokens = await getAccessToken(code)
        }
        
        const profile : Profile = await getUser(tokens.access_token)

        const user = await UserService.handleUser(profile, tokens) 
        res.cookie('user', {id:user.id,tokens:tokens})
        res.send(user)
    } catch ( err) {
        next(new AuthenticationError('An error occurred in callback'))
    }
}