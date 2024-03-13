import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  VStack,
} from "@chakra-ui/react";

const GenerateQuestion = ({
  presetOne,
  presetTwo,
  presetThree,
  presetFour,
}) => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    const positioning =
      "Let us help you with questions about the person you have specified.";

    const outputStructure =
      "Provide a response no longer than 50 words in length";

    const fetchedResponse = await fetch("/.netlify/functions/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        positioning,
        presetOne,
        presetTwo,
        presetThree,
        presetFour,
        question,
        outputStructure,
      }),
    });
    const jsonResponse = await fetchedResponse.json();
    setResponse(jsonResponse.message);
  };

  return (
    <>
      <form onSubmit={handleQuestionSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Ask a Question:</FormLabel>
            <Input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              borderColor="themeCustom.200"
              _hover={{
                borderColor: "themeCustom.500",
              }}
              _focus={{
                borderColor: "themeCustom.500",
              }}
              bg="themeCustom.50"
            />
          </FormControl>
          <Button type="submit">Submit</Button>
        </VStack>
      </form>
      {response && (
        <Box mt={4}>
          <Textarea
            minH={300}
            value={response}
            isReadOnly
            borderColor="themeCustom.200"
            _hover={{
              borderColor: "themeCustom.500",
            }}
            _focus={{
              borderColor: "themeCustom.500",
            }}
            bg="themeCustom.50"
          />
        </Box>
      )}
    </>
  );
};

export default GenerateQuestion;
