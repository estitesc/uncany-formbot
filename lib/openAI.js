import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const completionBody = (completion) => {
  return completion?.data?.choices?.[0].text;
};

export const getCompletion = async ({
  prompt,
  temperature = 0.9,
  max_tokens = 100,
  stop = "",
}) => {
  console.log("in get completion", prompt);
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt,
    temperature,
    max_tokens,
    stop,
  });
  console.log("completion came back", completionBody(completion));
  return completionBody(completion);
};

export const getCompletionFromParams = async (params) => {
  console.log("in get completion from params");
  const completion = await openai.createCompletion("text-davinci-003", {
    ...params,
  });
  return completionBody(completion);
};
