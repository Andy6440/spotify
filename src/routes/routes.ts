import express from 'express'
import playlistRoutes from './playlistRoutes'
import trackRoutes from './trackRoutes'
import authRoutes from './authRoutes'
import authenticationMiddleware from '../middlewares/authentication.middleware'
const router = express.Router()

/**
 * Auth Routes
 * Routes for user authentication and related operations.
 */
router.use('/', authRoutes)
authRoutes.use(authenticationMiddleware)
/**
 * Playlist Routes
 * Routes for managing and interacting with playlists.
 */
router.use('/playlist', playlistRoutes)

/**
 * Track Routes
 * Routes for managing and interacting with tracks.
 */
router.use('/track', trackRoutes)



export default router