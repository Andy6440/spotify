import express, { Express} from 'express'
import request from 'supertest'
import connectDB from '../../database/connection.database'
import mongoose from 'mongoose'
import authenticationMiddleware from '../../middlewares/authentication.middleware'
import 'dotenv/config'
import errorHandler from '../../middlewares/errorHandler'


// connection to the database
connectDB()

// Define a test suite
let app: Express

//configure before each test
beforeEach(() => {
    app = express() // Crea una nueva instancia de la aplicación antes de cada prueba    
    app.use(authenticationMiddleware)

    app.get('/', (_req, res) => res.sendStatus(200))
    app.use(errorHandler) // Use the errorHandler middleware for handling errors.
})


afterAll(async () => {
    await mongoose.connection.close()
})

// Define a test
describe('Authentication Middleware', () => {
    it('should set the access token cookie when not present', async () => {
        const response = await request(app).get('/') 
        expect(response.status).toBe(200)
        expect(response.headers['set-cookie']).toBeDefined()
    })    
})
