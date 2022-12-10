const { Configuration, OpenAIApi } = require("openai");
import { APIKEY } from "../../config";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
  const { idea } = req.body;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
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
