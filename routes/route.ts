import { Application } from "express";
import viewsRouter from "./views.route"
import apiRouter from "./api.route";

export default function registerRoutes(app: Application) {
    // Views
    app.use('/', viewsRouter);

    // API
    app.use('/api', apiRouter);
}