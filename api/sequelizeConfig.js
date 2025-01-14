// sequelizeConfig.mjs
/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';
const databaseUrl = 'postgres://postgres:postgres@localhost:5432/example'

const sequelize = new Sequelize(databaseUrl);

export default sequelize;