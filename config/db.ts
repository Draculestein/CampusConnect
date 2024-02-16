import { DataSource } from "typeorm";
import "reflect-metadata"


export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'dev.sqlite',
    entities: ['models/*.model.js']
})