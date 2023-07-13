import express from 'express'
import errorHandler from '../middlewares/errorHandler'
import { getAccessToken, redirectString,getUser} from '../services/auth'
import {getAll} from '../services/spotify'
const router = express.Router()

router.get('/login', function (_req, res) {
    res.clearCookie('code')
    const query = redirectString()
    res.redirect(`https://accounts.spotify.com/authorize?${query.param}`)
})


router.get('/callback', async(req, res, next) => {
    

    const code = req.query.code || null
    if(typeof code !=='string'){
        throw new Error('nooou')
    }
    res.cookie('code',code)
    try {
        const tokens = await getAccessToken(code)        
        const user = await getUser(tokens.access_token)
        res.send({user:user,token:tokens.access_token});
    } catch (err) {
       next(err)
    }
})



router.get('/topTrack', async(_req, res, next) => {
    const token = ""

    getAll(token)
        .then(response => {
            res.send(response)
        })
        .catch(err => next(err))
})



router.use(errorHandler)


export default router