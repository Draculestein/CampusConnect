import { Request, Response } from 'express';
import { User } from '../db/models/User.model';
import * as argon2 from 'argon2';
import passport, { DoneCallback, use } from 'passport';
import { Strategy } from 'passport-local';
import { UserRepository } from '../db/repositories/User.repositories';
import logger from '../config/logger';

interface UserResult {
    id: number,
    email: string
}

export async function signUpWithEmailAndPassword(req: Request, res: Response) {
    if (!req.body.email)
        return res.status(400).json({ message: 'Missing email field!' });

    if (!req.body.password)
        return res.status(400).json({ message: 'Missing password field!' });

    const { email, password } = req.body;

    try {
        const result = await UserRepository.findOne({
            where: {
                email
            }
        });

        if (result != null) {
            return res.status(403).json({ message: 'Email is already associated with an account!' });
        }

        const newUser = new User();
        newUser.email = email;
        newUser.password = await argon2.hash(password);

        await UserRepository.save(newUser);

        res.status(200).json({ message: 'Successful sign up with email and password!' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error signing up with email and password!' });
    };

}

passport.use('local-signin',
    new Strategy({ usernameField: 'email' }, async (email, password, done) => {

        try {
            const result = await UserRepository.findOne({
                where: {
                    email
                }
            });

            if (result == null) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }

            const verifyResult = await argon2.verify(result?.password!, password);
            if (verifyResult) {
                const user: UserResult = { id: result.id, email: result.email };
                return done(null, user);
            }
            else
                return done(null, false, { message: 'Incorrect username or password.' });

        } catch (error) {
            logger.error(error);
            return done(error, false);
        };
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user: UserResult, done) => {
    try {
        const result = await UserRepository.findOne({
            where: {
                id: user?.id
            }
        });

        if (result)
            done(null, result);
        else
            throw new Error('User does not exist');
    } catch (error) {
        done(error, false);
    }
});