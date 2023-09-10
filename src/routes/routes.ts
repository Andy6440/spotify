import express from 'express'
import playlistRoutes from './playlistRoutes'
import trackRoutes from './trackRoutes'
import authRoutes from './authRoutes'
import authenticationMiddleware from '../middlewares/authentication.middleware'
const router = express.Router()

/**
 *  Auth Routes
 * 
 * 
 */
router.use('/', authRoutes)

authRoutes.use(authenticationMiddleware)
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



export default router