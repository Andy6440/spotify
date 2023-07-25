import express from 'express'
import router from './routes/routes'
import cookieParser from 'cookie-parser'

import 'dotenv/config'
import errorHandler from './middlewares/errorHandler'

const app = express()
const port =process.env.PORT
app.use(cookieParser())
app.use(express.json()) //middlewara para convertir data a json

app.use('/',router)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`jumpint ${port}`)
})
