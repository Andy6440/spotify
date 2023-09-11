import { NextFunction, Request, Response } from 'express'
import { getAll ,getLikedSongs } from '../services/Spotify/spotify'

/**
 * Handler function for getting the top tracks.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export const topTrack = async (req: Request, res: Response, next: NextFunction) => {
    // Get the access token from the request cookies.
    const { access_token } = req.cookies

    // Get the limit and offset query parameters from the request.
    const limit = req.query.limit as string
    const offset = req.query.offset as string

    try {
        // Call the getAll function to get the top tracks.
        const response = await getAll(limit, offset, access_token)

        // Send the response.
        res.send(response)
    } catch (error) {
        // Call the next function with the error.
        next(error)
    }
}

/**
 * Handle request for retrieving liked songs.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export const likedSongs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the access token from the request cookies.
        const { access_token } = req.cookies

        // Get the limit and offset query parameters from the request.
        const limit = req.query.limit as string
        const offset = req.query.offset as string

        // Call the getLikedSongs function to get the liked songs.
        const response = await getLikedSongs(limit, offset, access_token)

        // Send the response.
        res.send(response)
    } catch (error) {
        // Call the next function with the error.
        next(error)
    }
}
