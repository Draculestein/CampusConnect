import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../db/models/User.model';

export function signupWithEmailAndPassword(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    const newUser = new User()
}