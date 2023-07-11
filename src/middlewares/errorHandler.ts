import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: any,_req: Request, _res: Response, next: NextFunction) => {
    next(err)
}
export default errorHandler