import express from "express";
import path from "path";
import dotenv from "dotenv";
import registerRoutes from "./routes/route"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // default port to listen

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

registerRoutes(app);

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});