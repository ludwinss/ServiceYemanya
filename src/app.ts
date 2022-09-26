// DotEnv Config
import './config/env';

import cors from 'cors';
import express, { Application } from 'express';
import path from 'path';

import { DBConnection } from './models';
import { enroutingAPI } from './routes';

const app: Application = express();

// DBConnection.getInstance().sync({ force: true })
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
//Add Static and Tmp Files
app.set('tmp', path.join(__dirname, '/tmp'));
app.use(express.static(path.join(__dirname, '/tmp')));

enroutingAPI(app);

export default app;
