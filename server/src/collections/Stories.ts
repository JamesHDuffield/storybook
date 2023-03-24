import { Story } from 'payload/generated-types';
import { CollectionConfig, CollectionBeforeChangeHook, CollectionBeforeValidateHook } from 'payload/types';
import { generateContentFromPrompt } from '../services/openai';
import { generatePromptFromOptions } from '../services/prompt';
import { getRandomOptionId } from '../services/random-option';

const generateOptions: CollectionBeforeValidateHook<Story> = async ({ data }) => {
  if (!data.character) {
    data.character = await getRandomOptionId('characters');
  }
  if (!data.plot) {
    data.plot = await getRandomOptionId('plots');
  }
  if (!data.theme) {
    data.theme = await getRandomOptionId('themes');
  }
  if (!data.style) {
    data.style = await getRandomOptionId('styles');
  }
  return data;
};

const generateContent: CollectionBeforeChangeHook<Story> = async ({ data }) => {
  if (data.status === 'awaiting') {
    console.log(`Generating prompt for story`);
    const prompt = await generatePromptFromOptions(data);
    console.log(`Generating content for story`);
    const content = await generateContentFromPrompt(prompt);
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
  access: {
    read: () => true, // All stories are public
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
    beforeValidate: [generateOptions],
    beforeChange: [generateContent],
  },
};

export default Stories;
