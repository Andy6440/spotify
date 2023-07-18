import { NextFunction, Request, Response } from 'express'
import { getAll ,getLikedSongs } from '../services/spotify'

export const topTrack = (_req:Request,res :Response,next:NextFunction) =>{
    getAll()
        .then(response => {
            res.send(response)
        })
        .catch(err => next(err))
}
export const likedSongs = async(_req:Request,res :Response,next:NextFunction) =>{
    console.log('pasa por aca')
    getLikedSongs()
        .then(response => {
            res.send(response)
        })
        .catch(err => next(err))
}