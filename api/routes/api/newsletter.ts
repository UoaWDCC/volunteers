const express = require("express");
import { createNewsletter, saveNewsletterTitle } from '../../controllers/newsletterController';

const router = express.Router();

router.post('/create', createNewsletter);

router.post('/preview', async (req: any, res: any) => {
    try {
        const {newsletterTitle, newsletterDescription, newsletterEventIds} = req.body;
        const { createNewsletter } = require('../../controllers/newsletterController');
        
        let formattedHtml = '';
        const mockRes = {
            status: () => mockRes,
            json: (data: any) => {
                if (data.success && data.formattedNewsletter) {
                    formattedHtml = data.formattedNewsletter;
                }
            }
        };
        
        await createNewsletter(req, mockRes);
        
        res.setHeader('Content-Type', 'text/html');
        res.send(formattedHtml);
    } catch (error) {
        res.status(500).send('<h1>Error generating newsletter preview</h1>');
    }
});

router.post('/titles', saveNewsletterTitle);

export default router;
