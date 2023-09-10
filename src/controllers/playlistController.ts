import { NextFunction, Request, Response } from 'express'
import { create, getPlaylistById,editDetails, getItemsById, saveItems ,removeItems} from '../services/Spotify/playlist'
import { CreatePlaylist, RemoveItems, SaveItems } from '../interfaces/playlist'


export const getPlaylist = (req:Request,res :Response,next:NextFunction) =>{    
    const id = req.params.id as string
    const cookies = req.cookies
    const token = cookies.access_token as string
    getPlaylistById(id,token).then(response=> res.send(response)).catch(err => next(err))
    
}

export const createPlaylist = (req:Request,res :Response,next:NextFunction) =>{    
    const id = process.env.USER_ID as string
    const params = req.body as CreatePlaylist
    const cookies = req.cookies
    const token = cookies.access_token as string
    create(id,params,token).then(response=> res.send(response)).catch(err => next(err))    
}

export const insertItems = (req:Request,res :Response,next:NextFunction) =>{    
    const id = req.params.id as string
    const params = req.body as SaveItems  
    const cookies = req.cookies
    const token = cookies.access_token as string
    saveItems(id,params,token).then(response=> res.send(response)).catch(err => next(err))    
}

export const deleteItems = (req:Request,res :Response,next:NextFunction) =>{    
    const id = req.params.id as string
    const params = req.body as RemoveItems
    const cookies = req.cookies
    const token = cookies.access_token as string
    removeItems(id,params,token).then(response=> res.send(response)).catch(err => next(err))    
}

export const changePlaylistDetails = (req:Request,res :Response,next:NextFunction) =>{    
    const id = req.params.id as string
    const params = req.body as CreatePlaylist
    const cookies = req.cookies
    const token = cookies.access_token as string
    editDetails(id,params,token).then(response=> res.send(response)).catch(err => next(err))    
}

export const getItems = (req:Request,res :Response,next:NextFunction) =>{    
    const id = req.params.id as string
    const limit =  req.query.limit as string
    const offset =req.query.offset as  string
    const cookies = req.cookies
    const token = cookies.access_token as string
    getItemsById(id,limit,offset,token).then(response=> res.send(response)).catch(err => next(err))    
}