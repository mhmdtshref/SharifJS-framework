import { Server as server } from 'http';
import { Application } from "express";

export class Server {
    
    private server: server;

    constructor(app: Application) {
        this.server = new server(app);
    }

    run = (): void => {
        this.listen();
    }

    private listen = (): void => {
        this.server.listen(5000, (): void => {
            console.log(`Server is running on http://localhost:5000/`);
        });
    }
}