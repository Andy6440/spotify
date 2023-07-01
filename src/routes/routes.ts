import express from "express"
import { getAll } from "../services/services"


const router = express.Router()

router.get('/', async(_, res) => {
    try {
        const data = await getAll();
        res.send(data);
      } catch (error) {
        res.status(500).send(error);
      }
})
router.post('/', (_, res) => {
    console.log('wer3245')
    res.send('post listenn')
})


export default router