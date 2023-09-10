import {  NextFunction, Request, Response} from 'express'
import { getAccessToken, getUser, /* getUser, */ redirectString } from '../services/Spotify/auth'
import AuthenticationError from '../models/errors/AuthenticationError'
import { AccessToken, Profile } from '../interfaces/User'
import UserService from '../services/db/User/User.service'
// import { Profile } from '../interfaces/User'
// import { AccessToken, Profile } from '../interfaces/User'
// import UserService from '../services/db/User/User.service'


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
// export const callback = async(req:Request,res :Response,next:NextFunction) =>{
   
//     try {
//         let tokens :AccessToken = {
//             access_token:'',
//             refresh_token:''
//         }

//         if(req.cookies.user.tokens){
//             tokens = req.cookies.user.tokens
//         }else{
//             const code = req.query.code as string
//             tokens = await getAccessToken(code)
//         }
        
//         const profile : Profile = await getUser(tokens.access_token)

//         
//         res.cookie('user', {id:user.id,tokens:tokens})
//         res.send(user)
//     } catch ( err) {
//         next(new AuthenticationError('An error occurred in callback'))
//     }
// }


export const callback = async(req:Request,res :Response,next:NextFunction) =>{
   
    try {
        let tokens :AccessToken = {
            access_token:'',
            refresh_token:''
        }
        if(req.cookies.tokens){           
            tokens = req.cookies.tokens  as AccessToken 
        }else{
            const code = req.query.code as string
            tokens = await getAccessToken(code)
        }
        
        const profile : Profile = await getUser(tokens.access_token)
        const user = await UserService.handleUser(profile, tokens) 
        res.send(user)
      
    } catch ( err) {
        next(new AuthenticationError('An error occurred in callback'))
    }
}
export const UserProfile = async(req:Request,res :Response,next:NextFunction) =>{
   
    try {
        const cookies = req.cookies
        const profile : Profile = await getUser(cookies.access_token)
        
        res.send(profile)
    } catch ( err) {
        next(new AuthenticationError('An error occurred in callback'))
    }
}