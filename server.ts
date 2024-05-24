import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morganMiddleware from "./middleware/morgan.middleware";
import { AppDataSource } from './db/db'
import registerRoutes from "./routes/route"
import logger from "./config/logger";

const app = express();
const port = process.env.PORT || 3000; // default port to listen

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));

registerRoutes(app);

AppDataSource.initialize()
    .then(() => {
        logger.info("Data Source has been initialized!");
    })
    .catch((err) => {
        logger.error("Error during Data Source initialization:", err);
    });

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    logger.info(`Server started at http://localhost:${port}`);
});