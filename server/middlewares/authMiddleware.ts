// middlewares/authMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extended Request Interface to include user
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        dateOfBirth: Date;
        gender: string;
    };
}

interface JwtPayloadExtended extends JwtPayload {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    gender: string;
}

export default function authMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadExtended;
            req.user = {
                id: decoded.id,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                email: decoded.email,
                dateOfBirth: decoded.dateOfBirth,
                gender: decoded.gender,
            };
            next();
        } catch (error: any) {
            console.error('Not authorized, token failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'No token provided, authorization denied' });
    }
}
