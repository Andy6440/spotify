import {  Request, Response } from 'express'
import { getAccessToken, getUser, redirectString } from '../services/auth'
import AppError from '../models/errors/AppError'


export const login = (_req:Request,res :Response) =>{
    res.clearCookie('code')
    const query = redirectString()
    res.redirect(`https://accounts.spotify.com/authorize?${query.param}`)
}
export const callback = async(req:Request,res :Response) =>{
    const code = req.query.code as string 
    res.cookie('code',code)
    try {
        const tokens = await getAccessToken(code)        
        const user = await getUser(tokens.access_token)
        res.send({user:user,token:tokens.access_token})
    } catch ( err) {
        console.log(err)
        throw new AppError(401,'An error occurred in callback')
    }
}