import { NextFunction, Request, Response } from 'express'
import { create, getPlaylistById,editDetails, getItemsById, saveItems ,removeItems} from '../services/Spotify/playlist'
import { CreatePlaylist, RemoveItems, SaveItems } from '../interfaces/playlist'


/**
 * Get a playlist by id
 * @param {Request} request - The request object containing the ID parameter and cookies.
 * @param {Response} response - The response object.
 * @param {NextFunction} nextFunction - The next function.
 */
export const getPlaylist = async (request: Request, response: Response, nextFunction: NextFunction) => {
    // Extract the playlist ID from the request parameters
    const { id } = request.params

    // Retrieve the cookies from the request
    const { access_token } = request.cookies

    try {
        // Call the function to get the playlist by its ID
        const playlist = await getPlaylistById(id, access_token)

        // Send the playlist response to the client
        response.send(playlist)
    } catch (error) {
        // Pass any errors to the next middleware function
        nextFunction(error)
    }
}

/**
 * Create a playlist.
 * 
 * @param {Request} request - The request object containing the ID parameter and cookies.
 * @param {Response} response - The response object.
 * @param {NextFunction} nextFunction - The next function.
 */
export const createPlaylist = async (request: Request, response: Response, nextFunction: NextFunction) => {
    try {
        const userId = process.env.USER_ID as string
        const params = request.body as CreatePlaylist

        // Retrieve the access token from the cookies
        const { access_token } = request.cookies

        // Create the playlist using the specified ID, parameters, and access token
        const playlist = await create(userId, params, access_token)

        // Send the created playlist as the response
        response.send(playlist)
    } catch (error) {
        // Pass any errors to the next middleware function
        nextFunction(error)
    }
}

/**
 * Create a playlist.
 * 
 * @param {Request} req - The request object containing the ID parameter and cookies.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export const insertItems = async(req:Request,res :Response,next:NextFunction) =>{
    try{
        // Extract the playlist ID from the request parameters
        const {id} = req.params
        const params = req.body as SaveItems  
        // Retrieve the access token from the cookies
        const { access_token } = req.cookies
    
        // Save the playlist items
        const result =await saveItems(id,params,access_token)

        // Send result
        res.send(result)
    } catch (error) {
        // Pass any errors to the next middleware function
        next(error)
    }
}

/**
 * Delete items from playlist
 * 
 * @param {Request} req - The request object containing the ID parameter and cookies.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export const deleteItems = (req:Request,res :Response,next:NextFunction) =>{
    try{
        // Extract the playlist ID from the request parameters
        const {id} = req.params
        const params = req.body as RemoveItems

        // Retrieve the access token from the cookies
        const { access_token } = req.cookies

        // delete items from playlist
        const result =  removeItems(id,params,access_token)

        // Send result
        res.send(result)
    } catch (error) {
        // Pass any errors to the next middleware function
        next(error)
    }
   
}


/**
 * Change details of a playlist
 * 
 * @param {Request} req - The request object containing the ID parameter and cookies.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export const changePlaylistDetails = (req:Request,res :Response,next:NextFunction) =>{
   
    try{
        // Extract the playlist ID from the request parameters
        const {id} = req.params
        const params = req.body as CreatePlaylist
        // Retrieve the access token from the cookies
        const { access_token } = req.cookies

        // Change details of a playlist
        const result = editDetails(id,params,access_token)

        // Send result
        res.send(result)
    } catch (error) {
        // Pass any errors to the next middleware function
        next(error)
    }
}

/**
 * Get items from a playlist
 * 
 * @param {Request} req - The request object containing the ID parameter and cookies.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export const getItems = async(req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract the playlist ID from the request parameters
        const { id } = req.params
        const limit = req.query.limit as string
        const offset = req.query.offset as string
        // Retrieve the access token from the cookies
        const { access_token } = req.cookies
        // Get items from a playlist
        const result = await getItemsById(id, limit, offset, access_token)
        // Send the result
        res.send(result)
    } catch (error) {
        // Pass any errors to the next middleware function        
        next(error)
    }
}
