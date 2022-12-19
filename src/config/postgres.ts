import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOption: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: ['dist/infrastructure/persistence/postgres/models/*.js'],
    migrations: ['dist/infrastructure/persistence/postgres/migrations/*.js'],
    synchronize: false,
    migrationsRun: true
}

const dataSource = new DataSource(dataSourceOption);

export default dataSource;