import { sendEmail, previewEmail } from '../../controllers/emailController';
const express = require("express");

const router = express.Router();

// POST route to email newsletter
router.post('/send', sendEmail);

// preview for newsletter
router.post('/preview', previewEmail);

export default router;