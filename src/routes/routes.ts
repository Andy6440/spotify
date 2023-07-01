import express from "express"


const router = express.Router()

router.get('/', (_, res) => {
    console.log('dfsdfsdfdf')
    
    res.send('get listenn')
})
router.post('/', (_, res) => {
    console.log('wer3245')
    res.send('post listenn')
})


export default router