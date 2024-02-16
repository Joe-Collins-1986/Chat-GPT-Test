// Example using React JSX
import React, { useState } from "react";

function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [preset, setPreset] = useState(
    "My WIFE is a SPORTY 21 year old who loves ANIMALS. Really tailor the answer to my next question to HER focusing on her age, likes and gender. Start out you answer by explaining why it is well suited to her."
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your serverless function here
    const fetchedResponse = await fetch("/.netlify/functions/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ preset, question }),
    });
    const jsonResponse = await fetchedResponse.json();
    setResponse(jsonResponse.message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Ask a Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
}

export default QuestionForm;
