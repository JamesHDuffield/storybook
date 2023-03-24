import payload from 'payload';
import { Story } from 'payload/generated-types';

export const generatePromptFromOptions = async (story: Partial<Story>): Promise<string> => {
  const character = await payload.findByID({
    collection: 'characters',
    id: story.character as string,
    depth: 1,
  });
  const theme = await payload.findByID({
    collection: 'themes',
    id: story.theme as string,
    depth: 1,
  });
  const plot = await payload.findByID({
    collection: 'plots',
    id: story.plot as string,
    depth: 1,
  });
  const style = await payload.findByID({
    collection: 'styles',
    id: story.style as string,
    depth: 1,
  });
  return `${style.content}---\n\nWrite a short children's story following the prvious examples format about ${character.description} who ${plot.description}, with the theme of ${theme.description}.`;
};
