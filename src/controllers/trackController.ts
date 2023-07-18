import { NextFunction, Request, Response } from 'express'
import { getAll ,getLikedSongs } from '../services/spotify'

export const topTrack = (_req:Request,res :Response,next:NextFunction) =>{
    
    // const limit   req.query.limit as number
    getAll()
        .then(response => {
            res.send(response)
        })
        .catch(err => next(err))
}
export const likedSongs = async(_req:Request,res :Response,next:NextFunction) =>{
    getLikedSongs()
        .then(response => {
            res.send(response)
        })
        .catch(err => next(err))
}