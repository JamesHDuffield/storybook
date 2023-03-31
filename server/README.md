# Storybook Payload CMS

This project was created using create-payload-app using the blank template.

## How to Use

- Configure a `.env` file with the following:

  - MONGODB_URI
  - PAYLOAD_SECRET
  - OPENAI_API_KEY
  - OPENAI_MODEL
  - OPENAI_MAX_TOKENS
  - SERVER_URL
  - PAYLOAD_PUBLIC_CORS_ORIGINS

- `npm start dev` will start up your application and reload on any changes.

### Docker

To build the docker image, run `docker build -t storybook .`

Ensure you are passing all needed environment variables when starting up your container via `--env-file` or setting them with your deployment.

`docker run --env-file .env -p 3000:3000 storybook`
