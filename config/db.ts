import { DataSource } from "typeorm";
import { User } from '../models/User.model'
import "reflect-metadata"


export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'dev.sqlite',
    entities: [User],
    logging: ['query', 'error'],
    logger: 'advanced-console',
    synchronize: true,
    dropSchema: true
})