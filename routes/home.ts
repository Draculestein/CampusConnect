import { Router } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../models/User.model";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const homeRouter = Router();

// Home page
homeRouter.get("/", async (req, res) => {
    // render the index template
    res.render("index");
});

// Login 
homeRouter.post("/login", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    signInWithEmailAndPassword(auth, username, password)
    .then(userCredential => {
        const user = userCredential.user;

    })
    .catch(error => {

    });

});

// Sign up 
homeRouter.post("/signup", (req, res) => {
    var email = req.body.username;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var dob = req.body.birthday as Date;
    var gender = req.body.sex;

    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
        const user = userCredential.user;
        const userId = user.uid;

        const userObj = new User();
        userObj.id = userId;
        userObj.firstName = firstName;
        userObj.lastName = lastName;
        userObj.dob = dob;
    })
    .catch(error => {

    });

});


export default homeRouter;