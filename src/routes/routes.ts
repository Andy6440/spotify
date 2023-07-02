import express from 'express';
import errorHandler from '../middlewares/errorHandler';
import { getAll } from "../services/services"

// handle error
// validate form
// parse info
const router = express.Router()

router.get('/', async (_req, res, next) => {
  try {
    const data = await getAll();
    res.send(data);
  } catch (err) {
    next(err);
  }
})
router.post('/', (_, res) => {
  res.send('post listenn')
})
router.use(errorHandler);


export default router