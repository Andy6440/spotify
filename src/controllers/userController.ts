import {  NextFunction, Request, Response } from 'express'
import { getAccessToken, getUser, redirectString } from '../services/auth'
import AuthenticationError from '../models/errors/AuthenticationError'


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
    const code = req.query.code as string 
    res.cookie('code',code)
    try {
        const tokens = await getAccessToken(code)    
        const user = await getUser(tokens.access_token)
        res.send({user:user,token:tokens.access_token})
    } catch ( err) {
        next(new AuthenticationError('An error occurred in callback'))
    }
}