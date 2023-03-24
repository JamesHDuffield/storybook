import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const generateFromPrompt = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.createCompletion({
      model: process.env.OPENAI_MODEL,
      prompt,
      max_tokens: +process.env.OPENAI_MAX_TOKENS,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.error(error?.response?.data?.error); // Axios error format
    throw error;
  }
};
