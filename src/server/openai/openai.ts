import axios from "axios";
import { env } from "../../env/server.mjs";

type OpenAIResponse = {
  data: {
    choices: {
      text: string;
    }[];
  };
};

export const openai = axios.create({
  baseURL: "https://api.openai.com/v1/completions",
  headers: { Authorization: `Bearer ${env.OPEN_AI_SECRET}` },
});

export const generateTweetIdeas = async (input: string) => {
  try {
    const response: OpenAIResponse = await openai.post("", {
      model: "text-davinci-003",
      prompt: `Generate 5 tweets about: ${input}. Use a number list to separete them.`,
      max_tokens: 200,
      temperature: 1,
    });

    const tweetIdeas = response.data.choices[0]?.text;

    return mapTweetIdeas(tweetIdeas ?? "");
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const mapTweetIdeas = (tweetIdeas: string) => {
  return tweetIdeas
    .split("\n")
    .filter((item) => item.includes("."))
    .map((item) => item.split(".")[1]?.trim()) as string[];
};
