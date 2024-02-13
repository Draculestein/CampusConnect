import {Application} from "express";
import * as home from "./home";
import * as result from "./result";

export default function registerRoutes(app: Application) {
    home.register(app);
    result.register(app);
}