import { NextFunction, Request, Response } from 'express'
import { getAll } from '../services/spotify'

export const topTrack = async(_req:Request,res :Response,next:NextFunction) =>{
    const token = process.env.TOKEN as string
    getAll(token)
        .then(response => {
            res.send(response)
        })
        .catch(err => next(err))
}