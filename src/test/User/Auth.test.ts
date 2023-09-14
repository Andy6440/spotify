// Import necessary modules
import request from 'supertest'
import express, { Express } from 'express'
import { login } from '../../controllers/userController'

// Define a test suite for authentication routes
describe('Auth routes', () => {
    let app: Express // Declare a variable to hold the Express app instance

    // Before each test in this suite, this function will run
    beforeEach(() => {
        app = express() // Initialize a new Express app
        app.use(express.json())  // Use the JSON middleware to parse incoming JSON requests
        app.get('/login', login) // Define the /login route with the login function
    })
    
    // Define an individual test
    it('should clear the code cookie and redirect to Spotify', async () => {
        // Make a GET request to the /login route of the app
        const response = await request(app).get('/login')
    
        // Expect the response status to be 302 (redirection)
        expect(response.status).toBe(302)
        
        // Expect the redirection location to match the Spotify authorization URL
        expect(response.header.location).toMatch(/https:\/\/accounts\.spotify\.com\/authorize\?/)
    })
})