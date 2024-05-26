import { Router } from "express";
import { signUpWithEmailAndPassword } from '../controllers/auth.controllers';
import passport from "passport";
import logger from "../config/logger";

const apiRouter = Router();

apiRouter.post('/login', passport.authenticate('local-signin'),
    (req, res, next) => {
        if(!req.user) return res.status(401).json({ message: 'Unauthenticated!' });
        // return res.status(200).json({ message: 'User authenticated' });
        return res.redirect('/');
    }
);

apiRouter.post('/signup', passport.authenticate('local-signin'), (req, res, next) => {
    if(!req.user) return signUpWithEmailAndPassword(req, res);

    return res.status(200);
});

apiRouter.post('/logout', (req, res, next) => {
    req.logout((err) => logger.error(err));
});

export default apiRouter;