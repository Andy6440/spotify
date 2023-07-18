import express from 'express'
import errorHandler from '../middlewares/errorHandler'
import { login,callback } from '../controllers/userController'
import { likedSongs, topTrack } from '../controllers/trackController'
import { validateRequiredParam, validateTokenParam } from '../middlewares/validation'
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
router.get('/callback', callback, validateRequiredParam('code'))


/**
 *  TrackController Routes
 * 
 * 
 */

// Route: GET /topTrack
// Description: Endpoint to get top track
router.get('/topTrack', topTrack, validateTokenParam())

// Route: GET /topTrack
// Description: Endpoint to get top track
router.get('/likedSongs', likedSongs, validateTokenParam())


// Middleware for handling errors
router.use(errorHandler)

export default router