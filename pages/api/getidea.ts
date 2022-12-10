import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
  const { idea } = req.body;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: (idea),
      temperature: 0.6,
      max_tokens: 2048,
    });
    res.status(200).json({ data: completion.data.choices[0].text });
  } catch (er) {
    console.log(er);
  }
}

interface ReqTypes {
  priceMin: string;
  priceMax: string;
  gender: string;
  age: string;
  hobbies: string;
}
