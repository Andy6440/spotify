
import express from 'express'
import { validateStringParam, validateNumberParam,   validateArrayParam } from '../validations/validation'
import { changePlaylistDetails, createPlaylist, deleteItems, getItems, getPlaylist, insertItems } from '../controllers/playlistController'
import { validatePlaylistParams } from '../validations/RequestPlaylistValidation'
const playlistRoutes = express.Router()

/**
 *  PlaylistController Routes
 * 
 * 
*/

/**
 * Create a new playlist.
 * 
 * @route POST /playlists
 * 
 * @param {string} name - The name of the new playlist. Found in the request body.
 * @param {string} description - Description of the new playlist. Found in the request body.
 * @param {boolean} [public] - Optional. Whether the playlist should be public or private. Found in the request body.
 * @param {string} access_token - The authentication token. Found in the cookies.
 * 
 * @example
 * // Request
 * POST /playlists
 * Content-Type: application/json
 * 
 * {
 *   "name": "My New Playlist",
 *   "description": "My new playlist description",
 *   "public": false
 * }
 */
playlistRoutes.post('/', validatePlaylistParams(), createPlaylist)

/**
 * Get a playlist by id
 * 
 * @route GET /playlists/:id
 * 
 * @param {string} id - The ID of the playlist to retrieve. Found in the route parameter.
 * 
 * @example
 * // Request
 * GET /playlists/37i9dQZF1DXcBWIGoYBM5M
 */
playlistRoutes.get('/:id', validateStringParam('id'), getPlaylist)

/**
 * Get items tracks from a playlist
 * 
 * @route GET /playlists/:id/tracks?limit={limit}&offset={offset}
 * 
 * @param {string} id - The ID of the playlist from which to retrieve tracks. Found in the route parameter.
 * @param {number} [limit] - Optional. The number of tracks to retrieve. Found in the query parameter.
 * @param {number} [offset] - Optional. The starting point for pagination. Found in the query parameter.
 * 
 * @example
 * // Request
 * GET /playlists/12345/37i9dQZF1DXcBWIGoYBM5M?limit=10&offset=5
 */
playlistRoutes.get('/:id/tracks',validateStringParam('id'),validateNumberParam('limit'),validateNumberParam('offset') , getItems)

/**
 * Add tracks to a playlist by its ID.
 * 
 * @route POST /playlists/:id/tracks
 * @param {string} id - Playlist ID from the route.
 * @param {string[]} uris - Array of track URIs in the request body.
 * @param {number} [position] - Optional position to insert tracks in the request body.
 * 
 * @example
 * POST /playlists/12345/tracks
 * {
 *   "uris": ["spotify:track:30XU4suKzCeoCK9YFzdufg", "spotify:track:37i9dQZF1DXcBWIGoYBM5M"],
 *   "position": 5
 * }
 */
playlistRoutes.post('/:id/tracks', validateStringParam('id'),validateArrayParam('uris'),validateNumberParam('position') , insertItems)

/**
 * Remove tracks from a playlist by its ID.
 * 
 * @route DELETE /playlists/:id/tracks
 * @param {string} id - Playlist ID from the route.
 * @param {string} snapshot_id - Snapshot ID for versioning, from the request body.
 * @param {string[]} tracks - Array of track URIs to remove, in the request body.
 * 
 * @example
 * DELETE /playlists/12345/tracks
 * {
 *   "tracks": [
 *       {
 *          "uri": "spotify:track:2PLi7OmleXPNBrGLon3sUy"
 *      }
 *  ],
 *  "snapshot_id":"MixjYzAxNDg2ZTRmOGVmNmQ2MDZiNGIxMTE2MmUyNzllMjQxZGRjMWQ3"
 * }  
 */
playlistRoutes.delete('/:id/tracks', validateStringParam('id'), validateStringParam('snapshot_id'), validateArrayParam('tracks'), deleteItems)


/**
 * Update the details of a playlist by its ID.
 * 
 * @route PUT /playlists/details/:id
 * @param {string} id - Playlist ID from the route.
 * @param {Object} details - Playlist details to update, from the request body.
 * 
 * @example
 * PUT /playlists/details/12345
 * {
 *   "name": "Updated Playlist Name",
 *   "description": "New Description",
 *   "public": false
 * }
 */
playlistRoutes.put('/details/:id', validateStringParam('id'),validatePlaylistParams(), changePlaylistDetails)

export default playlistRoutes