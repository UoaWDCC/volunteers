const express = require("express");
import { createNewsletter } from '../../controllers/newsletterController';

const router = express.Router();

// POST route to create and format a newsletter
router.post('/create', createNewsletter);

export default router;
