import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morganMiddleware from "./middleware/morgan.middleware";
import { AppDataSource } from './config/db'
import registerRoutes from "./routes/route"
import logger from "./config/logger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // default port to listen

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("public"));

registerRoutes(app);

logger.info('Log level:', process.env.LOG_LEVEL);

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
    logger.info(`server started at http://localhost:${port}`);
});