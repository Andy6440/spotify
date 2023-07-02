import express from 'express';
import errorHandler from '../middlewares/errorHandler';
import { getAll } from "../services/services"

const router = express.Router()

router.get('/', (_req, res, next) => {
  getAll()
    .then(respose => res.send(respose))
    .catch(err => next(err));
})
router.post('/', (_, res) => {
  res.send('post listenn')
})
router.use(errorHandler);


export default router