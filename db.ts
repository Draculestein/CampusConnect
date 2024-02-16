import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'dev.sqlite'
})