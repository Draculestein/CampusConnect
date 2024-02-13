import * as express from "express";

export default function registerRoutes(app: express.Application) {
    // define a route handler for the default home page
    app.get("/", (req, res) => {
        // render the index template
        res.render("index", {title: "Hello World!"});
    });
}