import { CollectionConfig } from 'payload/types';

const Themes: CollectionConfig = {
  slug: 'themes',
  admin: {
    useAsTitle: 'description',
  },
  fields: [
    {
      name: 'description',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
};

export default Themes;
