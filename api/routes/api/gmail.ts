import express from 'express';
import { 
    searchNewsletterInGmail, 
    getNewsletterContent, 
    getNewsletterIdentifiers 
} from '../../controllers/gmailController';

const router = express.Router();

// Get all stored newsletter identifiers (from newsletter collection)
router.get('/identifiers', getNewsletterIdentifiers);

// Search Gmail for newsletters by custom name
router.get('/search/:customName', searchNewsletterInGmail);

// Get full newsletter content from Gmail by message ID
router.get('/content/:messageId', getNewsletterContent);

export default router;
