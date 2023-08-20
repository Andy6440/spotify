
import express from 'express'
import {  validateTokenParam,validateStringParam,validateSpotifyUserId, validateNumberParam,  validateArrayUriParam, validateArrayTracksParam } from '../middlewares/validation'
import { changePlaylistDetails, createPlaylist, deleteItems, getItems, getPlaylist, insertItems } from '../controllers/playlistController'
import { validatePlaylistParams } from '../middlewares/RequestPlaylistValidation'
const playlistRoutes = express.Router()

/**
 *  PlaylistController Routes
 * 
 * 
*/
// Route: POST /playlist
// Description: Endpoint to create playlist
playlistRoutes.post('/', validateTokenParam(),validateSpotifyUserId(),validatePlaylistParams(), createPlaylist)

// Route: GET /playlist
// param: id
// Description: Endpoint to get playlist by id
playlistRoutes.get('/:id', validateTokenParam(),validateStringParam('id'), getPlaylist)

// Route: GET /playlist/:id/tracks
// param: id
// Description: Endpoint to get full details of the items of a playlist owned by a Spotify user.
playlistRoutes.get('/:id/tracks', validateTokenParam(),validateStringParam('id'),validateNumberParam('limit'),validateNumberParam('offset') , getItems)

// Route: POST /playlist/:id/tracks
// param: id
// Description: Endpoint to add one or more items to a user's playlist.
playlistRoutes.post('/:id/tracks', validateTokenParam(),validateStringParam('id'),validateArrayUriParam('tracks'),validateNumberParam('position') , insertItems)

// Route: DELTE /playlist/:id/tracks
// param: id
// Description: Endpoint to Remove one or more items from a user's playlist.
playlistRoutes.delete('/:id/tracks', validateTokenParam(),validateStringParam('id'),validateStringParam('snapshot_id'),validateArrayTracksParam('tracks'), deleteItems)

// Route: PUT /playlist-change-details
// Description: Endpoint to Change a playlist's name and public/private state
playlistRoutes.put('/playlist/change-details/:id', validateTokenParam(),validateStringParam('id'),validatePlaylistParams(), changePlaylistDetails)

export default playlistRoutes