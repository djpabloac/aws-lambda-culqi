export const config = {
  auth: {
    tokenBearer: process.env.TOKEN_BEARER!
  },
  db: {
    pg: {
      host: process.env.POSTGRES_HOST!,
      port: parseInt(process.env.POSTGRES_PORT!),
      username: process.env.POSTGRES_USERNAME!,
      password: process.env.POSTGRES_PASSWORD!,
      database: process.env.POSTGRES_DATABASE!
    }
  },
  redis: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!),
    password: process.env.REDIS_PASSWORD
  }
}