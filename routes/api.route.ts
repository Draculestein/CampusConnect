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

    if(req.body.page) {
        page = Number(req.body.page);
    }

    if(req.body.programs && (req.body.programs === 'two' || req.body.programs === 'four')) {
        numOfYears = req.body.programs === 'two' ? 2 : 4;
    }

    if(req.body.cityType) {
        cityType = String(req.body.cityType);
    }

    if(req.body.climate) {
        climate = String(req.body.climate);
    }

    if(req.body.isPublic) {
        isPublic = Boolean(isPublic);
    }

    if(req.body.country) {
        country = String(req.body.country);
    }

    const [resultArray, resultCount, error] = await searchByFilters(page, numOfYears, cityType, climate, isPublic, country);

    if(error)
        return next(error);

    return res.status(200).json({
        count: resultCount,
        result: resultArray
    });
})

// apiRouter.get('/search-name')
export default apiRouter;