// Example using React JSX
import React, { useState } from "react";

function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your serverless function here
    const fetchedResponse = await fetch("/.netlify/functions/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
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
