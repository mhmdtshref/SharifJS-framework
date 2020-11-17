import { ExpressApp } from './app';
import { Server } from './server';

const app = (new ExpressApp()).app;
const server = new Server(app);
server.run();
