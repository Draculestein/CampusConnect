import { Request, Response, NextFunction } from "express";


export function expectLogin(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated())
        next();
    else {
        req.session.redirect = req.path;
        return res.redirect('/login');
    };
}