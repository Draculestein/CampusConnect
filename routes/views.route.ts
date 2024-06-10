import { Router, Request, Response, NextFunction } from "express";
import { expectLogin } from '../middleware/auth.middleware';
import logger from "../logger/logger";
import { searchByUrl } from "../controllers/search.controllers";

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
viewsRouter.get('/form/:orgUrl', expectLogin, (req: Request, res: Response) => {
  res.render('form');
});

// University search result page
viewsRouter.get('/search', async (req: Request, res: Response, next: NextFunction) => {
  res.render('result_page');
});

viewsRouter.get('/home', expectLogin, (req: Request, res: Response, next: NextFunction) => {
  res.render('home_page');
});

viewsRouter.get('/uni/:url', async (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.params;

  const organization = await searchByUrl(url);

  if(!organization) return res.render('error', {
    message: 'Organization not found!',
    error: {
      status: '404',
      stack: 'No stack'
    }
  })

  res.render('university_landing', organization);
});
export default viewsRouter;