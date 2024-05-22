import { Request, Response } from 'express';
// import * as jwt from 'jsonwebtoken';
import { User } from '../db/models/User.model';
import * as argon2 from 'argon2';
import { UserRepository } from '../db/repositories/User.repositories';
import logger from '../config/logger';

export async function signUpWithEmailAndPassword(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    logger.debug('In signup controller');
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = await argon2.hash(password);

    try {
        await UserRepository.save(newUser);

        res.status(200).send('Successful sign up with email and password');
    } catch (error) {
        logger.error(error);
        res.status(500).send('Error signing up with email and password');
    }

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
            res.status(401).send('Unauthenticated');
            return;
        }

        const verifyResult = await argon2.verify(result?.password!, password);

        if (verifyResult)
            res.status(200).send('Login successful');
        else
            res.status(401).send('Unauthenticated');
    } catch (error) {
        logger.error(error);
        res.status(500).send('Error signing in with email and password');

    }

}