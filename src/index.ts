import express from 'express'
import router from './routes/routes'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import errorHandler from './middlewares/errorHandler'
import { validateEnvVariables } from './validations/startupValidations'
import mongoose from 'mongoose'

const uri = 'mongodb://mongo:27017/spotify'
  
// Connect to MongoDB
mongoose.connect(uri)
    .then((db) => {
        console.log('Conectado a MongoDB',db.connection.host)
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error)
    })

// Validate environment variables
validateEnvVariables()

// Initialize the Express application.
const app = express()
const port =process.env.PORT

// Middleware setup.
app.use(cookieParser()) // Parse cookies from the request.
app.use(express.json()) //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

// Routes and error handling.
app.use('/', router) // Use the main router for handling routes.
app.use(errorHandler) // Use the errorHandler middleware for handling errors.

// Start the Express server.
app.listen(port,()=>{
    console.log(`jumpint ${port}`)
})
