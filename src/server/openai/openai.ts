import axios from "axios";
import { env } from "../../env/server.mjs";

type DavinciModelResponse = {
  data: {
    choices: {
      text: string;
    }[];
  };
};

type ChatGPTModelResponse = {
  data: {
    choices: {
      index: 0;
      message: {
        role: string;
        content: string;
      };
    }[];
  };
};

export const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: { Authorization: `Bearer ${env.OPEN_AI_SECRET}` },
});

const getTweetIdeasUsingDavinciModel = async (input: string) => {
  const response: DavinciModelResponse = await openai.post("/completions", {
    model: "text-davinci-003",
    prompt: `Generate 5 tweets about: ${input}. Use a number list to separete them.`,
    max_tokens: 200,
    temperature: 1,
  });

  const tweetIdeas = response.data.choices[0]?.text;

  return mapTweetIdeas(tweetIdeas ?? "");
};

const getTweetIdeasUsingChatGPTModel = async (input: string) => {
  const response: ChatGPTModelResponse = await openai.post(
    "/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Generate 5 tweets about: ${input}. Use a number list to separete them.`,
        },
      ],
    }
  );

  const tweetIdeas = response.data.choices[0]?.message.content;

  return mapTweetIdeas(tweetIdeas ?? "");
};

export const generateTweetIdeas = async (input: string) => {
  const tweetIdeas = await getTweetIdeasUsingChatGPTModel(input);

  return tweetIdeas;
};

export const mapTweetIdeas = (tweetIdeas: string) => {
  return tweetIdeas
    .split("\n")
    .filter((item) => item.includes("."))
    .map((item) => item.split(".")[1]?.trim()) as string[];
};
