import { Story } from 'payload/generated-types';
import { CollectionConfig, CollectionBeforeChangeHook } from 'payload/types';
import { generateFromPrompt } from '../services/openai';

const generateContent: CollectionBeforeChangeHook<Story> = async ({ data }) => {
  if (data.prompt && data.status === 'awaiting') {
    console.log(`Generating content for story`);
    const content = await generateFromPrompt(data.prompt);
    data.content = content.trim();
    data.status = 'unapproved';
  }
  return data;
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
      defaultValue: 'awaiting',
      options: [
        { label: 'Awaiting Generation', value: 'awaiting' },
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
    beforeChange: [generateContent],
  },
};

export default Stories;
