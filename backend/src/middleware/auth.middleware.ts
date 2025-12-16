import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Ensure JWT_SECRET is set in production
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('FATAL ERROR: JWT_SECRET is not defined in production environment');
}

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-for-local-development-only';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
