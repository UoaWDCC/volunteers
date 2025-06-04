import { sendEmail } from '../../controllers/emailController';
const express = require("express");

const router = express.Router();

// POST route to email newsletter
router.post('/send', sendEmail);

export default router;