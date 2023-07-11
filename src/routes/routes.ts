import express from 'express'
import errorHandler from '../middlewares/errorHandler'
import { getAll } from '../services/spotify'
import { getAccessToken, redirectString } from '../services/auth'

const router = express.Router()


router.get('/login', function (_req, res) {

    const query = redirectString()
    res.cookie(query.stateKey, query.state)
    res.redirect(`https://accounts.spotify.com/authorize?${query.param}`)
})

router.get('/callback', async(req, res, _next) => {
    const code = req.query.code 

    if (typeof code !== 'string') {
        throw new Error('code is not defined or is not a string')
    }
   const result = await getAccessToken()
   res.cookie('access_spotify', result)
   res.send(result)
})


router.get('/topTrack', (_req, res, next) => {
    getAll()
        .then(response => {
            res.send(response)
        })
        .catch(err => next(err))
})

// function isString(value: any): value is string {
//     return typeof value === 'string'
// }


router.use(errorHandler)


export default router