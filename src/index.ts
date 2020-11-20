/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config();
import { ExpressApp } from './app';
import { Server } from './server';
/* eslint-enable */

const app = new ExpressApp().app;
const server = new Server(app);
server.run();
