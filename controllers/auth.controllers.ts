import { Request, Response } from 'express';
import { User } from '../db/models/User.model';
import * as argon2 from 'argon2';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { UserRepository } from '../db/repositories/User.repositories';
import logger from '../logger/logger';

export async function signUpWithEmailAndPassword(email: string, password: string): Promise<[boolean, any]> {
    try {
        const result = await UserRepository.findOne({
            where: {
                email
            }
        });

        if (result != null) {
            return [false, { message: 'Email is already associated with an account!' }];
        }

        const newUser = new User();
        newUser.email = email;
        newUser.password = await argon2.hash(password);

        await UserRepository.save(newUser);

        return [true, { message: 'Successful sign up with email and password!' }];
    } catch (error) {
        logger.error(error);
        return [false, { message: 'Error signing up with email and password!' }];
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
                return done(null, result);
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
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const result = await UserRepository.findOne({
            where: {
                id
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