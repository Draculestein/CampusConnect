import { Request, Response } from 'express';
import { User } from '../db/models/User.model';
import * as argon2 from 'argon2';
import passport, { DoneCallback } from 'passport';
import { Strategy } from 'passport-local';
import { UserRepository } from '../db/repositories/User.repositories';
import logger from '../config/logger';

export async function signUpWithEmailAndPassword(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    try {
        const result = await UserRepository.findOne({
            where: {
                email
            }
        });

        if (result != null) {
            res.status(403).json({ message: 'Email is already associated with an account!' });
            return;
        }

        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = await argon2.hash(password);

        await UserRepository.save(newUser);

        res.status(200).json({ message: 'Successful sign up with email and password!' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error signing up with email and password!' });
    };

}

export async function signInWithEmailAndPassword(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const result = await UserRepository.findOne({
            where: {
                email
            }
        });

        if (result == null) {
            res.status(401).json({ message: 'Unauthenticated!' });
            return;
        }

        const verifyResult = await argon2.verify(result?.password!, password);

        if (verifyResult) {

            res.status(200).json({
                message: 'Login successful',
            });
            return;
        }
        else
            res.status(401).json({ message: 'Unauthenticated!' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Error signing in with email and password!' });

    };
}

passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const result = await UserRepository.findOne({
                where: {
                    email: username
                }
            });

            if (result == null) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }

            const verifyResult = await argon2.verify(result?.password!, password);
            if (verifyResult) return done(null, result); else return done(null, false, { message: 'Incorrect username or password.' });
        } catch (error) {
            logger.error(error);
            return done(error, false);
        };
    })
);

passport.serializeUser((user: Express.User, done: DoneCallback) => {
    done(null, user);
});

passport.deserializeUser(async (username: string, done) => {
    try {
        const user = await UserRepository.findOne({
            where: {
                email: username
            }
        });

        if (user) done(null, user); else throw new Error('User does not exist');
    } catch (error) {
        done(error, false);
    }
});