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
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
    },
  ],
};

export default Styles;
