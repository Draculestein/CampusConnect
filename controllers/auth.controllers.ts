import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/User.model';
import * as argon2 from 'argon2';
import { UserRepository } from '../db/repositories/User.repositories';
import logger from '../config/logger';
import { jwtSecret } from '../server';

logger.info('JWT: ' + jwtSecret);

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
            const accessToken = jwt.sign(
                {
                    id: result.uuid
                },
                jwtSecret!,
                {
                    expiresIn: 86400
                });
            res.status(200).json({
                message: 'Login successful',
                accessToken
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