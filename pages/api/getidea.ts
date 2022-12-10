import { Configuration, OpenAIApi } from "openai";
import { APIKEY } from "../../config";

const configuration = new Configuration({
  apiKey: APIKEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
  const { idea } = req.body;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: idea,
      temperature: 0.6,
      max_tokens: 256,
    });
    res.status(200).json({ data: completion.data.choices[0].text });
  } catch (er) {
    res.status(400).json({ error: er });
  }
}

interface ReqTypes {
  priceMin: string;
  priceMax: string;
  gender: string;
  age: string;
  hobbies: string;
}
