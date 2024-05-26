import { Router } from "express";
import { signInWithEmailAndPassword, signUpWithEmailAndPassword } from '../controllers/auth.controllers';
import passport from "passport";

const apiRouter = Router();

apiRouter.post('/login',
    // async (req, res, next) => {
    //     signInWithEmailAndPassword(req, res);
    // }
    passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

apiRouter.post('/signup', (req, res, next) => {
    signUpWithEmailAndPassword(req, res);
});

export default apiRouter;