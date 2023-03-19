import { Story } from 'payload/generated-types';
import { CollectionConfig, CollectionBeforeChangeHook } from 'payload/types';
import { generateContentFromPrompt } from '../services/openai';
import { generatePromptFromOptions } from '../services/prompt';

const generatePrompt: CollectionBeforeChangeHook<Story> = async ({ data }) => {
  if (data.status === 'new') {
    console.log(`Generating prompt for story`);
    data.prompt = await generatePromptFromOptions(data);
    data.status = 'awaiting';
  }
  return data;
};

const generateContent: CollectionBeforeChangeHook<Story> = async ({ data }) => {
  if (data.prompt && data.status === 'awaiting') {
    console.log(`Generating content for story`);
    const content = await generateContentFromPrompt(data.prompt);
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
      name: 'character',
      type: 'relationship',
      relationTo: 'characters',
      required: true,
      hasMany: false,
    },
    {
      name: 'theme',
      type: 'relationship',
      relationTo: 'themes',
      required: true,
      hasMany: false,
    },
    {
      name: 'plot',
      type: 'relationship',
      relationTo: 'plots',
      required: true,
      hasMany: false,
    },
    {
      name: 'style',
      type: 'relationship',
      relationTo: 'styles',
      required: true,
      hasMany: false,
    },
    {
      name: 'prompt',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
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
    beforeChange: [generatePrompt, generateContent],
  },
};

export default Stories;
