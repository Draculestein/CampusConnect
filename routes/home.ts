import { Router } from "express";

const homeRouter = Router();

// Home page
homeRouter.get("/", (req, res) => {
    // render the index template
    res.render("index");
});

homeRouter.get("/form", (req, res) => {
    // render the index template
    res.render("fill-in-sheet");
});

export default homeRouter;