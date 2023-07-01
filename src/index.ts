import express from 'express'
import router from './routes/routes'
const app = express()
app.use(express.json()) //middlewara para convertir data a json
const port =3000

app.use('/api/spotify',router)
app.listen(port,()=>{
    console.log(`jumpint ${port}`)
})