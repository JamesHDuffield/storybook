import { CollectionConfig } from 'payload/types';

const Styles: CollectionConfig = {
  slug: 'styles',
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

export default Styles;
