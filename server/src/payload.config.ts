import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Stories from './collections/Stories';
import Characters from './collections/Character';
import Themes from './collections/Theme';
import Plots from './collections/Plots';
import Styles from './collections/Styles';

const config = {
  serverURL: `https://storybook-payload-cms-3h7kbxttga-km.a.run.app`,
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
  cors: ['https://storybook-payload-cms-3h7kbxttga-km.a.run.app', 'https://storybook-eosin-five.vercel.app'],
};

export default buildConfig(config);
