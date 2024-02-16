import { useState } from "react";

function App() {
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    // Placeholder for calling your serverless function
    alert(`Input: ${input}`);
  };

  return (
    <div className="App">
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
