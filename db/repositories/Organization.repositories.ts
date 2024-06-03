import { AppDataSource } from "../db";
import { Organization } from "../models/Organization.model";

export const OrganizationRepository = AppDataSource.getRepository(Organization);