import { Router } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../models/User.model";

const homeRouter = Router();

// define a route handler for the default home page
homeRouter.get("/", async (req, res) => {
    const user = new User();
    user.name = 'Test User';
    user.age = 21;
    user.nationality = '';
    user.dob = new Date(Date.now());
    user.graduationDate = new Date(Date.now());
    user.race = '';
    user.username = 'test_user';
    await AppDataSource.manager.save(user);
    // render the index template
    res.render("index", { title: "Hello World!" });
});


export default homeRouter;