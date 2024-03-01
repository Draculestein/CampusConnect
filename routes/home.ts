import { Router } from "express";

const homeRouter = Router();

// Home page
homeRouter.get("/", (req, res) => {
    // render the index template
    res.render("index");
});

export default homeRouter;