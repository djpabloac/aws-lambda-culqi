# AWS-LAMBDA-CULQI
Aws-lambda-culqi is a lambda function developed under the [Serverless](https://www.serverless.com/framework/docs) framework, the following project was built for a technical test.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.

`TOKEN_BEARER`

`POSTGRES_HOST`

`POSTGRES_PORT`

`POSTGRES_USERNAME`

`POSTGRES_PASSWORD`

`POSTGRES_DATABASE`

`REDIS_HOST`

`REDIS_PORT`

`REDIS_PASSWORD`

## Getting Started

Run the following commands:

```bash
# 1. Install package npm
npm i

# 2. Development (Default port: 9000)
npm run dev

# 3. Deploy
npm run deploy
```

Open [http://localhost:9000](http://localhost:9000) with your browser to see the result.

## Testing

Run the command:

```bash
npm run test
```

## Deploy

Before deploying the project you must ensure that you have [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed and configured in your local environment. Run the command:

```bash
npm run deploy:dev

# Or
npm run deploy:prod
```

## Authors

- [@dj.pablo.ac](https://gitlab.com/dj.pablo.ac)

## License

[MIT](https://choosealicense.com/licenses/mit/)