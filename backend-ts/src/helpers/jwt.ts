import jwt from 'express-jwt';
import { Request } from 'express';

export const authJwt = () => {
    const api = process.env.API_URL;

    return jwt({
        secret: process.env.SECRET,
        algorithms: ['HS256'],
        isRevoked,
    }).unless({
        path: [
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`,
        ],
    });
};

const isRevoked = (
    req: Request,
    payload: { isAdmin: boolean | null },
    done: any
) => {
    if (!payload.isAdmin) {
        done(null, true);
    }
    done();
};
