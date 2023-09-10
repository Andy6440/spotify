import { NextFunction, Request, Response } from 'express'
import { getAll ,getLikedSongs } from '../services/Spotify/spotify'

export const topTrack = (req:Request,res :Response,next:NextFunction) =>{
    const cookies = req.cookies
    const limit =  req.query.limit as string
    const offset =req.query.offset as  string
    const token = cookies.access_token
    getAll(limit,offset,token)
        .then(response => {
            res.send(response)
        })
        .catch(err => next(err))
}
export const likedSongs = async(req:Request,res :Response,next:NextFunction) =>{
    const limit =  req.query.limit as string
    const offset =req.query.offset as  string
    const cookies = req.cookies
    const token = cookies.access_token
    getLikedSongs(limit,offset,token)
        .then(response => {
            res.send(response)
        })
        .catch(err => next(err))
}