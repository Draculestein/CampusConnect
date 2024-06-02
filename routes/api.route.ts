import { Router } from "express";
import { signUpWithEmailAndPassword } from '../controllers/auth.controllers';
import { searchByFilters, searchByName } from '../controllers/search.controllers';
import passport from "passport";
import logger from "../config/logger";

const apiRouter = Router();

apiRouter.post('/login', passport.authenticate('local-signin'),
    (req, res, next) => {
        if(!req.user) return res.status(401).json({ message: 'Unauthenticated!' });
        const redirect = req.cookies.redirect || '/';
        logger.debug('Redirect:' + redirect);
        // return res.status(200).json({ message: 'User authenticated' });
        res.clearCookie('redirect');
        return res.redirect(redirect);
    }
);

apiRouter.post('/signup', (req, res, next) => {
    if(!req.user) return signUpWithEmailAndPassword(req, res);

    return res.status(200);
});

apiRouter.post('/logout', (req, res, next) => {
    req.logout((err) => logger.error(err));
});

apiRouter.get('/search-filters', async (req, res, next) => {
    let page = 1;
    let numOfYears = null;
    let cityType =  null;
    let climate = null;
    let isPublic = null;
    let country = null;

    // Input checking

    if(req.query.page) {
        page = Number(req.query.page);
    }

    if(req.query.programs && (req.query.programs == 'two' || req.query.programs == 'four')) {
        numOfYears = req.query.programs;
    }

    if(req.query.cityType) {
        cityType = String(req.query.cityType);
    }

    if(req.query.climate) {
        climate = String(req.query.climate);
    }

    if(req.query.isPublic) {
        isPublic = Boolean(isPublic);
    }

    if(req.query.country) {
        country = String(req.query.country);
    }

    const [resultArray, resultCount, error] = await searchByFilters(page, numOfYears, cityType, climate, isPublic, country);
})

// apiRouter.get('/search-name')
export default apiRouter;