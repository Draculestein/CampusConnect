import { Router, Request, Response, NextFunction } from "express";
import { expectLogin } from '../middleware/auth.middleware';
import session from 'express-session';
import logger from "../config/logger";

declare module 'express-session' {
  export interface SessionData {
    redirect: string;
  }
}


const viewsRouter = Router();

// Home page
viewsRouter.get("/", (req: Request, res: Response) => {
    // render the index template

    res.render("index", { loggedIn: req.user ? true : false });
});

// Signup page
viewsRouter.get("/signup", (req: Request, res: Response) => {
  res.render('sign_up');
});

// Login page
viewsRouter.get("/login", (req: Request, res: Response) => {
  res.render('log_in');
});

viewsRouter.get('/logout', (req, res, next) => {
  req.logout((err) => logger.error(err));
  res.send('Log out successful');
});

// Form page
viewsRouter.get("/form", expectLogin, (req: Request, res: Response) => {
  res.render("form");
});

// University search result page
viewsRouter.get('/result', (req: Request, res: Response, next: NextFunction) => {
    res.render('result_page', {
      content: [
        {
          image: '/images/UofU.png',
          background : '/images/harvardbuilding.png'
        },
        {
          image: '/images/UofU.png',
          background : '/images/uofubuilding.jpeg'
        },
        {
          image: '/images/MIT.png',
          background : '/images/mitbuilding.jpeg'
        },
        {
          image: '/images/Stanford.png',
          background : '/images/stanfordbuilding.jpeg'
        },
        {
          image: '/images/UofW.png',
          background : '/images/uofwbuilding.jpeg'
        },
      ]
    });
  });

viewsRouter.get('/home', expectLogin, (req: Request, res: Response, next: NextFunction) => {
  res.render('home_page');
});

viewsRouter.get('/uni', (req: Request, res: Response, next: NextFunction) => {
  res.render('university_of_utah');
});
export default viewsRouter;