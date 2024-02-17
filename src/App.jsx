import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ChatGptForm from "./components/ChatGptForm";
import "./api/axiosDefault";

import { Box } from "@chakra-ui/react";

import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";

const App = () => {
  return (
    <>
      <Box position="fixed" top={0} w="100vw" zIndex={5} area="nav">
        {/* <NavBar /> */}
        Put Navbar Here
      </Box>
      <Box pt="80px">
        <Routes>
          // Add alert for errors
          <Route exact path="/home/" element={<HomePage />} />
          {/* <Route exact path="/login/" element={<LoginPage />} /> */}
          <Route exact path="/register/" element={<RegisterPage />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
        <ChatGptForm />;
      </Box>
    </>
  );
};

export default App;

// function QuestionForm() {
//   const [question, setQuestion] = useState("");
//   const [response, setResponse] = useState("");
//   const [relationship, setRelationship] = useState("Wife");
//   const [personType, setPersonType] = useState("Sporty");
//   const [age, setAge] = useState("21");
//   const [loves, setLoves] = useState("Animals");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Update preset just before submitting
//     const updatedPreset = `My ${relationship} is a ${personType} ${age} year old who loves ${loves}. Really tailor the answer to my next question to her focusing on her age, likes, and gender. Start out your answer by explaining why it is well suited to her.`;

//     // Call your serverless function here with the updatedPreset
//     const fetchedResponse = await fetch("/.netlify/functions/chatgpt", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ preset: updatedPreset, question }),
//     });
//     const jsonResponse = await fetchedResponse.json();
//     setResponse(jsonResponse.message);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <br />
//         <label>
//           Relationship:
//           <select
//             value={relationship}
//             onChange={(e) => setRelationship(e.target.value)}
//           >
//             <option value="Wife">Wife</option>
//             <option value="Husband">Husband</option>
//             <option value="Friend">Friend</option>
//             <option value="Sibling">Sibling</option>
//             <option value="Parent">Parent</option>
//           </select>
//         </label>
//         <br />
//         <label>
//           Type of Person:
//           <select
//             value={personType}
//             onChange={(e) => setPersonType(e.target.value)}
//           >
//             <option value="Sporty">Sporty</option>
//             <option value="Intellectual">Intellectual</option>
//             <option value="Creative">Creative</option>
//             <option value="Adventurous">Adventurous</option>
//           </select>
//         </label>
//         <br />
//         <label>
//           Age:
//           <input
//             type="number"
//             value={age}
//             min="1"
//             max="100"
//             onChange={(e) => setAge(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Loves:
//           <select value={loves} onChange={(e) => setLoves(e.target.value)}>
//             <option value="Animals">Animals</option>
//             <option value="Books">Books</option>
//             <option value="Travel">Travel</option>
//             <option value="Music">Music</option>
//           </select>
//         </label>
//         <br />
//         <label>
//           Ask a Question:
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//       <div>{response}</div>
//     </div>
//   );
// }

// export default QuestionForm;
