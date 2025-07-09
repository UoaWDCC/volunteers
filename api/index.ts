import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
config();
console.log('process.env.ADMIN_EMAILS:', process.env.ADMIN_EMAILS);
import { authMiddleware } from './middleware/authMiddleware';
import path from 'path';

// Import Routers
//import routes from './routes/endpoints';
const routes = require('./routes/endpoints') // instead of line 7

const app = express();
config();

app.use(json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.PRODUCTION_DOMAIN
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(cookieParser());

app.use(express.static('public'));

// Protect all /admin routes and static files with admin authentication middleware
app.use('/admin', authMiddleware, express.static(path.join(__dirname, 'public/admin/build')));

// SPA fallback for /admin (also protected)
app.get('/admin*', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin/build/index.html'));
});

// Routes
app.use('/api', routes);

const port = Number.parseInt(process.env.PORT || '3000');
app.listen(port, () => {
 console.log(`Listening on port ${port}`);
});
