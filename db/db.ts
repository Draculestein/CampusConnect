import { DataSource } from "typeorm";
import { User } from './models/User.model';
import { Organization } from './models/Organization.model';
import { Permission } from './models/Permission.model';
import { Program } from './models/Programs.model';
import { Demography } from './models/Demography.model';
import { Role } from './models/Roles.model';
import { Session } from './models/Session.model';

import "reflect-metadata"


export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'dev.sqlite',
    entities: [User, Organization, Program, Demography, Permission, Role, Session],
    logging: ['query', 'error'],
    logger: 'advanced-console',
    synchronize: true,
    dropSchema: true
})