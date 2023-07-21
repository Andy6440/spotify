import { Request, Response, NextFunction } from 'express'

export interface Error {
    (err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ): void;
}export interface Result {
    (href: string,
        limit: number,
        next: string,
        offet: number,
        previous: number|null,
        total: 50,
        items: Array[]
    ): void;
}