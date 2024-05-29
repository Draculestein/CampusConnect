import { DataSource } from "typeorm";
import { User } from './models/User.model';
import { Organization } from './models/Organization.model';
import { Permission } from './models/Permission.model';
import { Program } from './models/Programs.model';
import { Demography } from './models/Demography.model';
import { Role } from './models/Roles.model';
import { Session } from './models/Session.model';
import { OrganizationSearch } from './models/OrganizationSearch.model';
import { Application } from './models/Application.model';

import "reflect-metadata"


export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'dev.sqlite',
    entities: [User, Organization, Program, Demography, Permission, Role, Session, Application, OrganizationSearch],
    logging: ['error'],
    logger: 'advanced-console',
    synchronize: true,
    dropSchema: false
})