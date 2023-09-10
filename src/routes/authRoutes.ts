
import express from 'express'
import { callback,  login,UserProfile } from '../controllers/userController'
import { validateRequiredParam } from '../validations/validation'
import authenticationMiddleware from '../middlewares/authentication.middleware'
const authRoutes = express.Router()
/**
 *  UserController Routes
 * 
 * 
 */

// Route: GET /login
// Description: Endpoint for user login
authRoutes.get('/login',login)

// Route: GET /callback
// Description: Endpoint for callback after user authentication
authRoutes.get('/callback', validateRequiredParam('code'), callback)

authRoutes.use(authenticationMiddleware)
// Route: GET /callback
// Description: Endpoint for callback after user authentication
authRoutes.get('/user',  UserProfile)

export default authRoutes