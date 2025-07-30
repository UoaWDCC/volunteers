const express = require("express");
import { createNewsletter, getAllNewsletters, saveNewsletterTitle } from '../../controllers/newsletterController';

const router = express.Router();

// POST route to create and format a newsletter
router.post('/create', createNewsletter);

router.get('/titles', getAllNewsletters);

router.post('/titles', saveNewsletterTitle);

export default router;
