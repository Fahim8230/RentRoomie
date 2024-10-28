// middlewares/authMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any; // Define a proper type based on your JWT payload
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Check if an authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(' ')[1];
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      // Attach user data to the request object
      req.user = decoded;
      next(); // Proceed to the next middleware
    } catch (error: any) {
      // Handle errors related to token verification (such as expiration or tampering)
      console.error('Not authorized, token failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // Handle cases where no token is present
    res.status(401).json({ message: 'No token provided, authorization denied' });
  }
};

export default authMiddleware;
