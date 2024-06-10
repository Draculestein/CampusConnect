import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import { TypeormStore } from "connect-typeorm";
import { SessionRepository } from "./db/repositories/Session.repositories";
import morganMiddleware from "./middleware/morgan.middleware";
import { AppDataSource } from './db/db'
import registerRoutes from "./routes/route"
import logger from "./logger/logger";
import passport from "passport";
import { runTestData } from './db/testData/runTestData';
import { initializeBucket } from './s3/s3';

let successfulSetup = true;

AppDataSource.initialize()
    .then(() => {
        logger.info("Data Source has been initialized!");
        if (process.env.DEV_MODE! === '1') runTestData();
    })
    .catch((err) => {
        logger.error("Error during Data Source initialization: " + err);
        successfulSetup = successfulSetup && false;
    });

initializeBucket()
    .then(([isSuccessful, error]) => {
        if (isSuccessful) { 
            logger.info('Bucket is ready!'); 
            return;
        }

        logger.error('Error when initializing bucket: ' + error);
        successfulSetup = successfulSetup && false;
    })
    .catch((error) => {
        logger.error('Error when initializing bucket: ' + error);
        successfulSetup = successfulSetup && false;

    })

if(!successfulSetup) {
    logger.error('Fail to setup connection to database and/or bucket! Aborting Express!');
    process.exit();
}

const app = express();
const port = process.env.PORT || 3000; // default port to listen

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false, // If using MariaDB.
        ttl: 86400
    }).connect(SessionRepository)
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

registerRoutes(app);



// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    logger.info(`Server started at http://localhost:${port}`);
});