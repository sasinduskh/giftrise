import { Configuration, OpenAIApi } from "openai";
import { APIKEY } from "../../config";

const configuration = new Configuration({
  apiKey: APIKEY,
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
function generatePrompt({ priceMin, priceMax, gender, age, hobbies }: any) {
  return `suggest 3 Christmas gift ideas between ${priceMin}$ and ${priceMax}$ for a ${age} years old ${gender} that is into ${hobbies}.`;
}

interface ReqTypes {
  priceMin: string;
  priceMax: string;
  gender: string;
  age: string;
  hobbies: string;
}
