const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: body.prompt,
      max_tokens: 150,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: response.data.choices[0].text.trim() }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
