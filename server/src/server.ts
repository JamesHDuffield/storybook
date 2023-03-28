import express from 'express';
import payload from 'payload';
import * as dotenv from 'dotenv';

dotenv.config();

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
