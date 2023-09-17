
import express from 'express'
import { callback,  login,UserProfile ,refreshToken} from '../controllers/userController'
import { validateRequiredParam } from '../validations/validation'
import authenticationMiddleware from '../middlewares/authentication.middleware'
const authRoutes = express.Router()
/**
 *  UserController Routes
 * 
 * 
 */

/**
 * User login endpoint.
 * 
 * @route GET /login
 * 
 * @example
 * GET /login
 */
authRoutes.get('/login',login)

/**
 * Callback endpoint after user authentication.
 * 
 * @route GET /callback
 * @param {string} code - Authorization code required for the callback, from the query parameter.
 * 
 * @example
 * GET /callback?code=YOUR_AUTH_CODE_HERE
 */
authRoutes.get('/callback', validateRequiredParam('code'), callback)

/**
 * Apply authentication to all `authRoutes`.
 */
authRoutes.use(authenticationMiddleware)
/**
 * Get user profile endpoint.
 * 
 * @route GET /user
 * @param {string} access_token - The authentication token. Found in the cookies.
 */
authRoutes.get('/user',  UserProfile)

/**
 * Refresh token endpoint
 * 
 * @route POST /refresh-token
 * 
 * @example
 * POST /refresh-token
 */
authRoutes.post('/refresh-token',refreshToken)
export default authRoutes