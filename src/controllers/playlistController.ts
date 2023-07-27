import { NextFunction, Request, Response } from 'express'
import { getPlaylistById } from '../services/playlist'

export const getPlaylist = (req:Request,res :Response,next:NextFunction) =>{    
    const id = req.params.id as string
    getPlaylistById(id).then(response=> res.send(response)).catch(err => next(err))
    
}