import express from 'express'
import router from './routes/login'
import 'dotenv/config'

const app = express()
const port =process.env.PORT

app.use(express.json()) //middlewara para convertir data a json
app.use('/',router)

app.listen(port,()=>{
    console.log(`jumpint ${port}`)
})
