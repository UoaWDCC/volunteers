import { Request, Response } from 'express';
const { google } = require('googleapis');
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });


export const searchNewsletterInGmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { customName } = req.params;
        const searchQuery = `in:sent subject:"${customName}" OR subject:"Newsletter"`;
        
        const response = await gmail.users.messages.list({
            userId: 'me',
            q: searchQuery,
            maxResults: 10
        });

        if (!response.data.messages?.length) {
            res.status(404).json({
                success: false,
                message: `No newsletters found for: ${customName}`
            });
            return;
        }

        const newsletters = [];
        for (const message of response.data.messages) {
            const messageDetail = await gmail.users.messages.get({
                userId: 'me',
                id: message.id!
            });

            const headers = messageDetail.data.payload?.headers || [];
            newsletters.push({
                id: message.id,
                subject: headers.find((h: any) => h.name === 'Subject')?.value || '',
                date: headers.find((h: any) => h.name === 'Date')?.value || '',
                to: headers.find((h: any) => h.name === 'To')?.value || '',
                snippet: messageDetail.data.snippet
            });
        }

        res.json({ success: true, customName, newsletters });

    } catch (error) {
        console.error("Error searching Gmail:", error);
        res.status(500).json({ success: false, message: "Gmail search failed" });
    }
};

export const getNewsletterContent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { messageId } = req.params;
        
        const message = await gmail.users.messages.get({
            userId: 'me',
            id: messageId,
            format: 'full'
        });

        let htmlContent = '';
        const payload = message.data.payload;
        
        if (payload?.parts) {
            const htmlPart = payload.parts.find((part: any) => part.mimeType === 'text/html');
            if (htmlPart?.body?.data) {
                htmlContent = Buffer.from(htmlPart.body.data, 'base64').toString();
            }
        } else if (payload?.body?.data && payload.mimeType === 'text/html') {
            htmlContent = Buffer.from(payload.body.data, 'base64').toString();
        }

        const headers = payload?.headers || [];
        res.json({
            success: true,
            messageId,
            subject: headers.find((h: any) => h.name === 'Subject')?.value || '',
            date: headers.find((h: any) => h.name === 'Date')?.value || '',
            htmlContent,
            snippet: message.data.snippet
        });

    } catch (error) {
        console.error("Error getting newsletter content:", error);
        res.status(500).json({ success: false, message: "Failed to get content" });
    }
};

export const getNewsletterIdentifiers = async (req: Request, res: Response): Promise<void> => {
    try {
        const newslettersRef = collection(db, "newsletters");
        const snapshot = await getDocs(newslettersRef);
        
        const identifiers = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                customName: data.customName,
                title: data.title,
                emailSubject: data.emailSubject,
                createdAt: data.createdAt
            };
        }).filter(item => item.customName);

        res.json({
            success: true,
            identifiers
        });
    } catch (error) {
        console.error("Error getting newsletter identifiers:", error);
        res.status(500).json({ success: false, message: "Failed to get identifiers" });
    }
};
