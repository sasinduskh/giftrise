import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
  const { idea } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: idea,
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ data: completion.data.choices[0].text });
}

interface ReqTypes {
  priceMin: string;
  priceMax: string;
  gender: string;
  age: string;
  hobbies: string;
}
