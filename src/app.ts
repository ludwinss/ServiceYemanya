// DotEnv Config
import './config/env';

import express, { Application } from 'express';
import path from 'path';

import { enroutingAPI } from './routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
//Add Static and Tmp Files
app.set('tmp', path.join(__dirname, '/tmp'));
app.use(express.static(path.join(__dirname, '/tmp')));

enroutingAPI(app);

export default app;
