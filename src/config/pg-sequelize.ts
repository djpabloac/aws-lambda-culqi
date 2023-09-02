import pg from "pg";
import { Sequelize } from "sequelize";
import { config } from ".";

const { db } = config

const pgSequelize = new Sequelize({
  dialectModule: pg,
  dialect: 'postgres',
  logging: false,
  host: db.pg.host,
  port: db.pg.port,
  username: db.pg.username,
  password: db.pg.password,
  database: db.pg.database
})

const connect = async () => {
  try {
    await pgSequelize.authenticate()
  } catch (error) {
    console.error('Postgres had an error connecting')
  }
}

export {
  connect,
  pgSequelize
}