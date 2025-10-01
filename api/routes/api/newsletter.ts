import express from 'express';
import { createNewsletter, saveNewsletterTitle } from '../../controllers/newsletterController';

const router = express.Router();

router.post('/create', createNewsletter);

router.post('/titles', saveNewsletterTitle);

export default router;
