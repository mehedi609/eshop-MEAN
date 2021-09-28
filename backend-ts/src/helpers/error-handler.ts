import { Request, Response, Errback, NextFunction } from 'express';

export function errorHandler(
    err: Errback,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res
            .status(401)
            .json({ success: false, message: 'The user is not authorized' });
    }

    if (err.name === 'ValidationError') {
        //  validation error
        return res.status(401).json({ success: false, message: err });
    }

    // default to 500 server error
    return res.status(500).json({ success: false, message: err });
}
