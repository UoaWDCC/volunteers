import { google } from 'googleapis';
import { config } from 'dotenv';

config();

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

export { oauth2Client };
export const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
