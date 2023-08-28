import express from 'express'
import playlistRoutes from './playlistRoutes'
import trackRoutes from './trackRoutes'
import authRoutes from './authRoutes'
const router = express.Router()

/**
 *  Playlist Routes
 * 
 * 
 */
router.use('/playlist', playlistRoutes)

/**
 *  Track Routes
 * 
 * 
 */
router.use('/track', trackRoutes)

/**
 *  Auth Routes
 * 
 * 
 */
router.use('/', authRoutes)

export default router