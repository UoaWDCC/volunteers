// api/routes/api/auth.ts
import express from "express";
import { sessionLogin, sessionLogout } from "../../controllers/authController";

const router = express.Router();

// Route to handle login and create a session cookie
router.post("/sessionLogin", sessionLogin);

// Route to handle logout and clear session cookie
router.post("/sessionLogout", sessionLogout);

export default router;