import { CollectionConfig } from 'payload/types';

const Characters: CollectionConfig = {
  slug: 'characters',
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

export default Characters;
