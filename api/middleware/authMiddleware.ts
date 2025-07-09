import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { isAdminEmail } from "../config/admin-config";

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionCookie = req.cookies?.session;

    if (!sessionCookie) {
      return res.status(401).json({ error: "No session cookie found" });
    }

    // Verify the session cookie
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    
    // Check if user has email and is admin using centralized config
    if (!decodedClaims.email || !isAdminEmail(decodedClaims.email)) {
      return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }

    // Attach user info to request object
    req.user = decodedClaims;
    
    // console.log("Admin access granted for:", decodedClaims.email);
    next();
  } catch (error) {
    console.error("Session verification failed:", error);
    res.status(401).json({ error: "Invalid session" });
  }
};
