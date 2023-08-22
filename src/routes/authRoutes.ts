
import express from 'express'
import { callback, login } from '../controllers/userController'
import { validateRequiredParam } from '../validations/validation'
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



export default authRoutes