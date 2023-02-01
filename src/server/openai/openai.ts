import axios from "axios";
import { env } from "../../env/server.mjs";

export const openai = axios.create({
  baseURL: "https://api.openai.com/v1/engines/davinci/completions",
  headers: { Authorization: `Bearer ${env.OPEN_AI_SECRET}` },
});
