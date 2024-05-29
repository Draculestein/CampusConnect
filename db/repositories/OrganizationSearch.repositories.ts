import { AppDataSource } from "../db";
import { OrganizationSearch } from "../models/OrganizationSearch.model";

export const OrganizationSearchRepository = AppDataSource.getRepository(OrganizationSearch);