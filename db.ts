import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'dev.sqlite'
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })