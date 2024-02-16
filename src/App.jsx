import { useState } from "react";

function App() {
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("/.netlify/functions/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await response.json();
    alert(`Response: ${data.message}`);
  };

  return (
    <div className="App">
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
