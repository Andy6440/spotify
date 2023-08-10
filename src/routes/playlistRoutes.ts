
import express from 'express'
import {  validateTokenParam,validateStringParam,validateSpotifyUserId, validateNumberParam } from '../middlewares/validation'
import { changePlaylistDetails, createPlaylist, getItems, getPlaylist } from '../controllers/playlistController'
import { createPlaylistParams } from '../middlewares/RequestPlaylistValidation'
const playlistRoutes = express.Router()

/**
 *  PlaylistController Routes
 * 
 * 
*/
// Route: POST /playlist
// Description: Endpoint to create playlist
playlistRoutes.post('/', validateTokenParam(),validateSpotifyUserId(),createPlaylistParams(), createPlaylist)

// Route: GET /playlist
// param: id
// Description: Endpoint to get playlist by id
playlistRoutes.get('/:id', validateTokenParam(),validateStringParam('id'), getPlaylist)

// Route: GET /playlist/:id/tracks
// param: id
// Description: Endpoint to get full details of the items of a playlist owned by a Spotify user.
playlistRoutes.get('/:id/tracks', validateTokenParam(),validateStringParam('id'),validateNumberParam('limit'),validateNumberParam('offset') , getItems)

// Route: POST /playlist-change-details
// Description: Endpoint to Change a playlist's name and public/private state
playlistRoutes.put('/playlist/change-details/:id', validateTokenParam(),validateStringParam('id'),createPlaylistParams(), changePlaylistDetails)

export default playlistRoutes