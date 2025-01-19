import admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

interface AuthenticatedRequest extends Request {
    user: DecodedIdToken;
}

async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No token provided or invalid format" });
        return;
    }

    const idToken = authHeader.split(" ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        (req as AuthenticatedRequest).user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error: (error as Error).message });
        return;
    }
}

export default authenticateToken