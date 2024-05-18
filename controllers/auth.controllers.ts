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

        res.status(200).send('Successful Sign Up with Email and Password');
    } catch (error) {
        res.status(500).send('Error Signing Up with Email and Password');
    }

}