import { AppDataSource } from "../db";
import { Session } from "../models/Session.model";

export const SessionRepository = AppDataSource.getRepository(Session);