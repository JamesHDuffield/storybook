import { Story } from 'payload/generated-types';
import { CollectionConfig, CollectionBeforeChangeHook, CollectionBeforeValidateHook } from 'payload/types';
import { generateFromPrompt } from '../services/openai';
import { generateContentPromptFromOptions, generateTitlePromptFromOptions } from '../services/prompt';
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
    console.info(`Generating content prompt for story`);
    const contentPrompt = await generateContentPromptFromOptions(data);
    console.info(`Generating content for story`);
    data.content = await generateFromPrompt(contentPrompt);
    console.info(`Generating title prompt for story`);
    const titlePrompt = await generateTitlePromptFromOptions(data);
    console.info(`Generating title for story`);
    const title = await generateFromPrompt(titlePrompt);
    data.title = title.replace(/^"|"$/g, ''); // Remove quotes which AI commonly puts around title
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
    },
    {
      name: 'character',
      type: 'relationship',
      relationTo: 'characters',
      hasMany: false,
    },
    {
      name: 'theme',
      type: 'relationship',
      relationTo: 'themes',
      hasMany: false,
    },
    {
      name: 'plot',
      type: 'relationship',
      relationTo: 'plots',
      hasMany: false,
    },
    {
      name: 'style',
      type: 'relationship',
      relationTo: 'styles',
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
