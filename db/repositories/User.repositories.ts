import { AppDataSource } from "../db";
import { User } from "../models/User.model";

export const UserRepository = AppDataSource.getRepository(User);