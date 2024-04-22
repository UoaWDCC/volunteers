import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

// Import Routers
//import routes from './routes/endpoints';
const routes = require('./routes/endpoints') // instead of line 7

const app = express();
config();

app.use(json());
app.use(cors());
app.use(express.static('public'));

// Routes
app.use('/api', routes);

const port = Number.parseInt(process.env.PORT || '3000');
app.listen(port, () => {
 console.log(`Listening on port ${port}`);
});
