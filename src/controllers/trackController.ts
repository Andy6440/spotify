import { NextFunction, Request, Response } from 'express'
import { getAll ,getLikedSongs } from '../services/spotify'

export const topTrack = (req:Request,res :Response,next:NextFunction) =>{
    
    const limit =  req.query.limit as string
    const offset =req.query.offset as  string
    getAll(limit,offset)
        .then(response => {
            res.send(response)
        })
        .catch(err => next(err))
}
export const likedSongs = async(req:Request,res :Response,next:NextFunction) =>{
    const limit =  req.query.limit as string
    const offset =req.query.offset as  string
    getLikedSongs(limit,offset)
        .then(response => {
            res.send(response)
        })
        .catch(err => next(err))
}