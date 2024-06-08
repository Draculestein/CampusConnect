import { Application } from "../models/Application.model";
import { AppDataSource } from "../db";

export const ApplicationRepository = AppDataSource.getRepository(Application);