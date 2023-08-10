import express from 'express'
import { login,callback } from '../controllers/userController'
import { likedSongs, topTrack } from '../controllers/trackController'
import { validateNumberParam, validateRequiredParam, validateTokenParam,validateStringParam,validateSpotifyUserId } from '../middlewares/validation'
import { changePlaylistDetails, createPlaylist, getPlaylist } from '../controllers/playlistController'
import { createPlaylistParams } from '../middlewares/RequestPlaylistValidation'
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
// Route: GET /playlist
// param: id
// Description: Endpoint to get playlist by id
router.get('/playlist/:id', validateTokenParam(),validateStringParam('id'), getPlaylist)

// Route: POST /playlist
// Description: Endpoint to create playlist
router.post('/playlist', validateTokenParam(),validateSpotifyUserId(),createPlaylistParams(), createPlaylist)

// Route: POST /playlist-change-details
// Description: Endpoint to Change a playlist's name and public/private state
router.put('/playlist/change-details/:id', validateTokenParam(),validateStringParam('id'),createPlaylistParams(), changePlaylistDetails)



export default router