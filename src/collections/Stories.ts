import { Story } from 'payload/generated-types';
import { CollectionConfig, CollectionAfterChangeHook } from 'payload/types';

const generateContent: CollectionAfterChangeHook<Story> = async ({ doc, operation }) => {
  if (operation === 'create') {
    // TODO Generate content from AI source
    doc.content = `This is AI generated`;
  }
  return doc;
};

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
      type: 'textarea',
    },
  ],
  hooks: {
    afterChange: [generateContent],
  },
};

export default Stories;
