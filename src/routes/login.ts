import express from 'express'
import errorHandler from '../middlewares/errorHandler'
import {   callBack, redirectString } from '../services/auth'
import queryString from 'query-string'
import axios, { AxiosRequestConfig } from 'axios'

const router = express.Router()


router.get('/login', function(_req, res) {
    const directStringe = redirectString()
    res.redirect('https://accounts.spotify.com/authorize?' + directStringe)
})

router.get('/callback', function(req, res) {

    const querycode = req.query.code|| null
    const querystate = req.query.state|| null
    if (!isString(querystate)|| !isString(querycode) ){
        throw new Error('params need to be strings')
    }
    const state = querystate.toString()    
    const code = querycode.toString()
    if (state === null) {
        res.redirect('/#' +
        queryString
            .stringify({
                error: 'state_mismatch'
            }))
    }
    res.send(callBack(code,state))
})


router.get('/refresh_token', function(req, res) {
    const token : string = Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')
    const refresh_token = req.query.refresh_token
    const authOptions: AxiosRequestConfig = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: 'Basic ' + token,
        },
        data: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        method: 'POST',
    }
    axios(authOptions)
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            console.error(error)
        })
})
function isString(value: any): value is string {
    return typeof value === 'string'
}


router.use(errorHandler)


export default router