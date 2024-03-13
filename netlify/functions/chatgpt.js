import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handler(event) {
  try {
    const {
      positioning,
      presetOne,
      presetTwo,
      presetThree,
      presetFour,
      question,
      outputStructure,
    } = JSON.parse(event.body);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: positioning },
        { role: "user", content: presetOne },
        { role: "user", content: presetTwo },
        { role: "user", content: presetThree },
        { role: "user", content: presetFour },
        { role: "user", content: question },
        { role: "user", content: outputStructure },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: completion.choices[0].message.content }),
    };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
