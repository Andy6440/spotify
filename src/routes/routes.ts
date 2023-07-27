import express from 'express'
import { login,callback } from '../controllers/userController'
import { likedSongs, topTrack } from '../controllers/trackController'
import { validateNumberParam, validateRequiredParam, validateTokenParam,validateStringParam } from '../middlewares/validation'
import { getPlaylist } from '../controllers/playlistController'
const router = express.Router()

/**
 *  UserController Routes
 * 
 * 
 */

// Route: GET /login
// Description: Endpoint for user login
router.get('/login',login)

// Route: GET /callback
// Description: Endpoint for callback after user authentication
router.get('/callback', validateRequiredParam('code'), callback)


/**
 *  TrackController Routes
 * 
 * 
 */

// Route: GET /topTrack
// Description: Endpoint to get top track
router.get('/topTrack', validateTokenParam(),validateNumberParam('limit'),validateNumberParam('offset') , topTrack)

// Route: GET /topTrack
// Description: Endpoint to get top track
router.get('/likedSongs', validateTokenParam(),validateNumberParam('limit'),validateNumberParam('offset'), likedSongs)

/**
 *  PlaylistController Routes
 * 
 * 
*/
router.get('/playlist/:id', validateTokenParam(),validateStringParam('id'), getPlaylist)

export default router