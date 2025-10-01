import { google } from 'googleapis';
import * as http from 'http';
import { URL } from 'url';
import { config } from 'dotenv';

config();

const SCOPES = [
    'https://www.googleapis.com/auth/gmail.send', 
    'https://www.googleapis.com/auth/gmail.readonly'
];

const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'http://localhost:8080'
);

function authorize(): void {
    const server = http.createServer(async (req, res) => {
        const qs = new URL(req.url || '', 'http://localhost:8080').searchParams;
        const code = qs.get('code');
        
        if (code) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<h1>Authorization successful</h1><p>Close this window.</p>');
            server.close();
            
            try {
                const { tokens } = await oauth2Client.getToken(code);
                console.log('GMAIL_REFRESH_TOKEN=' + tokens.refresh_token);
                
                oauth2Client.setCredentials(tokens);
                await testGmailConnection(oauth2Client);
            } catch (error) {
                console.error('Error:', (error as Error).message);
            }
        }
    });

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    server.listen(8080, () => {
        console.log('Open this URL:', authUrl);
    });
}

async function testGmailConnection(auth: any): Promise<void> {
    try {
        const gmail = google.gmail({ version: 'v1', auth });
        const profile = await gmail.users.getProfile({ userId: 'me' });
        console.log('Connected:', profile.data.emailAddress);
    } catch (error) {
        console.error('Connection failed:', (error as Error).message);
    }
}

authorize();
