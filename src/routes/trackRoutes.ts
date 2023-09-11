
import express from 'express'
import {  validateNumberParam } from '../validations/validation'
import { likedSongs, topTrack } from '../controllers/trackController'
const trackRoutes = express.Router()

/**
 * TrackController Routes
 * Routes for managing and interacting with tracks.
 */

/**
 * Endpoint to get top tracks.
 * 
 * @route GET /track/top
 * @param {number} limit - Number of top tracks to retrieve.
 * @param {number} offset - Starting position for retrieval.
 * @param {string} access_token - The authentication token. Found in the cookies.

 */
trackRoutes.get('/top', validateNumberParam('limit'),validateNumberParam('offset') , topTrack)

/**
 * Endpoint to get liked songs.
 * 
 * @route GET /track/liked
 * @param {number} limit - Number of liked songs to retrieve.
 * @param {number} offset - Starting position for retrieval
 * @param {string} access_token - The authentication token. Found in the cookies..
 */
trackRoutes.get('/liked', validateNumberParam('limit'),validateNumberParam('offset'), likedSongs)

export default trackRoutes