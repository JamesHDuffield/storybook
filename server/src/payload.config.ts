import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Stories from './collections/Stories';
import Characters from './collections/Character';
import Themes from './collections/Theme';
import Plots from './collections/Plots';
import Styles from './collections/Styles';

export default buildConfig({
  serverURL: `http://localhost:3000`,
  admin: {
    user: Users.slug,
  },
  collections: [Users, Stories, Characters, Themes, Plots, Styles],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: '*',
});
