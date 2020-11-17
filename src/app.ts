import cors from 'cors';
import express, { Application } from 'express';
import { AppConstants } from './constants';

export class ExpressApp {

    app: Application;

    private appConstants = new AppConstants();

    constructor () {
        this.app = express();
    }

    setCors = () => {
        this.app.use(cors);
    }

    setSettings = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    setRouters = () => {
        const { context, version } = this.appConstants;
        this.app.use(`/${context}/${version}`);
    }
}