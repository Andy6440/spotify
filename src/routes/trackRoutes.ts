
import express from 'express'
import {  validateNumberParam } from '../validations/validation'
import { likedSongs, topTrack } from '../controllers/trackController'
const trackRoutes = express.Router()

/**
 *  TrackController Routes
 * 
 * 
 */

// Route: GET /topTrack
// Description: Endpoint to get top track
trackRoutes.get('/top', validateNumberParam('limit'),validateNumberParam('offset') , topTrack)

// Route: GET /topTrack
// Description: Endpoint to get top track
trackRoutes.get('/liked', validateNumberParam('limit'),validateNumberParam('offset'), likedSongs)

export default trackRoutes