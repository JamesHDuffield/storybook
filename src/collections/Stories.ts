import { CollectionConfig } from 'payload/types';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Stories: CollectionConfig = {
  slug: 'stories',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'prompt',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'unapproved',
      options: [
        { label: 'Unapproved', value: 'unapproved' },
        { label: 'Approved', value: 'approved' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
};

export default Stories;
