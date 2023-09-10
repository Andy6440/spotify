import express from 'express'
import router from './routes/routes'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import errorHandler from './middlewares/errorHandler'
import { validateEnvVariables } from './validations/startupValidations'
import mongoose from 'mongoose'

const uri = 'mongodb://mongo:27017/spotify'
  

mongoose.connect(uri)
    .then((db) => {
        console.log('Conectado a MongoDB',db.connection.host)
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error)
    })

validateEnvVariables()
const app = express()
const port =process.env.PORT
app.use(cookieParser())
app.use(express.json()) //middlewara para convertir data a json

app.use('/',router)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`jumpint ${port}`)
})
