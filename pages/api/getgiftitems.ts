import { NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
  const { priceMin, priceMax, gender, age, hobbies } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt({ priceMin, priceMax, gender, age, hobbies }),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
function generatePrompt({
  priceMin,
  priceMax,
  gender,
  age,
  hobbies,
}: ReqTypes) {
  return `suggest 3 Christmas gift ideas between ${priceMin}$ and ${priceMax}$ for a ${age} years old ${gender} that is into ${hobbies}.`;
}

interface ReqTypes {
  priceMin: string;
  priceMax: string;
  gender: string;
  age: string;
  hobbies: string;
}
