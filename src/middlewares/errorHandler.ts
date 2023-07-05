import { Response ,Request} from 'express'

function errorHandler(err: any,  _req: Request, res: Response) {
    console.error(err)
    res.status(500).send(err.message)
}

export default errorHandler