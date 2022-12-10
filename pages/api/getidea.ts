import { NextRequest } from "next/server";
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
