import { Router } from "express";
import { signUpWithEmailAndPassword } from '../controllers/auth.controllers';

const apiRouter = Router();

// apiRouter.post('/login', async (req, res, next) => {

// });

apiRouter.post('/signup', (req, res, next) => {
    signUpWithEmailAndPassword(req, res);
});

export default apiRouter;