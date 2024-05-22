import { Router } from "express";
import { signInWithEmailAndPassword, signUpWithEmailAndPassword } from '../controllers/auth.controllers';

const apiRouter = Router();

apiRouter.post('/login', async (req, res, next) => {
    signInWithEmailAndPassword(req, res);
});

apiRouter.post('/signup', (req, res, next) => {
    signUpWithEmailAndPassword(req, res);
});

export default apiRouter;