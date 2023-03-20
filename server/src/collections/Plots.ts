import { CollectionConfig } from 'payload/types';

const Plots: CollectionConfig = {
  slug: 'plots',
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

export default Plots;
