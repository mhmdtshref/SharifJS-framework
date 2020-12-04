/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config();
import { EnvConstants } from './constants';
import { ExpressApp } from './app';
import { Server } from './server';
/* eslint-enable */

EnvConstants.checkRequiredConstants()
  .then(() => {
    const app = new ExpressApp().app;
    const server = new Server(app);
    server.run();
  })
  .catch((error: Error) => {
    console.log('Unable to run server\nError: ' + error.message);
  });
