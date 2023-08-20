
import express from 'express'
import {  validateNumberParam, validateTokenParam } from '../middlewares/validation'
import { likedSongs, topTrack } from '../controllers/trackController'
const trackRoutes = express.Router()

/**
 *  TrackController Routes
 * 
 * 
 */

// Route: GET /topTrack
// Description: Endpoint to get top track
trackRoutes.get('/top', validateTokenParam(),validateNumberParam('limit'),validateNumberParam('offset') , topTrack)

// Route: GET /topTrack
// Description: Endpoint to get top track
trackRoutes.get('/liked', validateTokenParam(),validateNumberParam('limit'),validateNumberParam('offset'), likedSongs)

export default trackRoutes