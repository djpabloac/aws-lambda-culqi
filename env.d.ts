declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN_BEARER: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_USERNAME: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DATABASE: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASSWORD: string;
    }
  }
}

export { }