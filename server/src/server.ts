// DotEnv must be first
import * as dotenv from 'dotenv';

dotenv.config();

/* eslint-disable import/first */

import express from 'express';
import payload from 'payload';

/* eslint-enable import/first */

const app = express();

// Redirect root to Admin panel
app.get('/', (_, response) => {
  response.redirect('/admin');
});

const start = async (): Promise<void> => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here
  app.listen(3000);
};

void start();
