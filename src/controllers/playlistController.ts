import { NextFunction, Request, Response } from 'express'
import { create, getPlaylistById,editDetails, getItemsById } from '../services/playlist'
import { CreatePlaylist } from '../interfaces/playlist'

export const getPlaylist = (req:Request,res :Response,next:NextFunction) =>{    
    const id = req.params.id as string
    getPlaylistById(id).then(response=> res.send(response)).catch(err => next(err))
    
}
export const createPlaylist = (req:Request,res :Response,next:NextFunction) =>{    
    const id = process.env.USER_ID as string
    const params = req.body as CreatePlaylist  
    
    create(id,params).then(response=> res.send(response)).catch(err => next(err))    
}
export const changePlaylistDetails = (req:Request,res :Response,next:NextFunction) =>{    
    const id = req.params.id as string
    const params = req.body as CreatePlaylist  
    editDetails(id,params).then(response=> res.send(response)).catch(err => next(err))    
}

export const getItems = (req:Request,res :Response,next:NextFunction) =>{    
    const id = req.params.id as string
    const limit =  req.query.limit as string
    const offset =req.query.offset as  string
    getItemsById(id,limit,offset).then(response=> res.send(response)).catch(err => next(err))    
}