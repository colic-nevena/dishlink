import { Request, Response, NextFunction } from "express";

export const authorizeRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      const user = (req as any).user;
  
      if (!user || !allowedRoles.includes(user.role)) {
        res.status(403).json({ message: "Forbidden: Missing permissions" });
      }
  
      next();
    };
};