import express from 'express';
import volleyball from 'volleyball';
import path from 'path';
import dotenv from 'dotenv';

import { a } from './routes/index.js';

console.log(a);

dotenv.config();

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(volleyball);
app.use(express.static(path.join(__dirname + '../public')));

export default app;
