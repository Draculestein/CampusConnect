import { Router } from "express";

const homeRouter = Router();

// define a route handler for the default home page
homeRouter.get("/", (req, res) => {
    // render the index template
    res.render("index", { title: "Hello World!" });
});


export default homeRouter;