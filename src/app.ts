import cors from 'cors';
import express, { Application } from 'express';
import { AppConstants } from './constants';
import { AppRouter } from './routers';

export class ExpressApp {

    app: Application;

    private appConstants = new AppConstants();

    constructor () {
        this.app = express();
        this.setCors();
        this.setSettings();
        this.setRouters();
    }

    private setCors = () => {
        this.app.use(cors());
    }

    private setSettings = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private setRouters = () => {
        const { context, version } = this.appConstants;
        const { router } = new AppRouter();
        this.app.use(`/${context}/${version}`, router);
    }
}