import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import carsRouter from './routes/cars.js';
import  cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('PORT', process.env.PORT || 2500);
app.use(cors());
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './views/index.html')));
app.get('/coches', (req, res) => res.sendFile(path.join(__dirname, './views/coches.html')));

app.use('/cars', carsRouter);

app.listen(app.get('PORT'), () => console.log(`Server Ready at http://localhost:${app.get('PORT')}`));