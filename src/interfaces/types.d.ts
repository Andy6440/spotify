import { Request, Response, NextFunction } from 'express'

export interface Error {
    (err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ): void;
}