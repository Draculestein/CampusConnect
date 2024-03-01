import { Application } from "express";
import homeRouter from "./home"
import resultRouter from "./result";

export default function registerRoutes(app: Application) {
    app.use('/', homeRouter);
    app.use('/result', resultRouter);
}