import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const userQuestion = body.question; // Extract the user question from the request body

    const systemMessage =
      "This is a Valentine's Day themed chat. Feel free to ask any questions about love, relationships, or how to express affection to your loved ones.";

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "systemMessage" },
        { role: "user", content: userQuestion },
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
