import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Textarea,
  Container,
  VStack,
} from "@chakra-ui/react";
import styles from "../styles/ChatGptForm.module.css";

const ChatGptForm = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [relationship, setRelationship] = useState("Wife");
  const [personType, setPersonType] = useState("Sporty");
  const [age, setAge] = useState("21");
  const [loves, setLoves] = useState("Animals");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPreset = `My ${relationship} is a ${personType} ${age} year old who loves ${loves}.`;

    const fetchedResponse = await fetch("/.netlify/functions/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ preset: updatedPreset, question }),
    });
    const jsonResponse = await fetchedResponse.json();
    setResponse(jsonResponse.message);
  };

  return (
    <Box w="100%" px={{ base: "4", md: "8" }} py={4}>
      <div className={styles.Test}>thr</div>
      <Container
        maxW="full"
        p={5}
        borderRadius="lg"
        boxShadow="md"
        bg="pinkCustom.50"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Type of Person:</FormLabel>
              <Select
                value={personType}
                onChange={(e) => setPersonType(e.target.value)}
                borderColor="pinkCustom.200"
                _focus={{
                  borderColor: "pinkCustom.300",
                }}
              >
                <option value="Sporty">Sporty</option>
                <option value="Intellectual">Intellectual</option>
                <option value="Creative">Creative</option>
                <option value="Adventurous">Adventurous</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Relationship:</FormLabel>
              <Select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                borderColor="pinkCustom.200"
                _focus={{
                  borderColor: "pinkCustom.300",
                }}
              >
                <option value="Wife">Wife</option>
                <option value="Husband">Husband</option>
                <option value="Friend">Friend</option>
                <option value="Sibling">Sibling</option>
                <option value="Parent">Parent</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Age:</FormLabel>
              <Input
                type="number"
                value={age}
                min="1"
                max="100"
                onChange={(e) => setAge(e.target.value)}
                borderColor="pinkCustom.200"
                _focus={{
                  borderColor: "pinkCustom.300",
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Loves:</FormLabel>
              <Select
                value={loves}
                onChange={(e) => setLoves(e.target.value)}
                borderColor="pinkCustom.200"
                _focus={{
                  borderColor: "pinkCustom.300",
                }}
              >
                <option value="Animals">Animals</option>
                <option value="Books">Books</option>
                <option value="Travel">Travel</option>
                <option value="Music">Music</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Ask a Question:</FormLabel>
              <Input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                borderColor="pinkCustom.200"
                _focus={{
                  borderColor: "pinkCustom.300",
                }}
              />
            </FormControl>
            <Button colorScheme="pinkCustom" type="submit">
              Submit
            </Button>
          </VStack>
        </form>
        {response && (
          <Box mt={4}>
            <Textarea
              value={response}
              isReadOnly
              borderColor="pinkCustom.200"
              _focus={{
                borderColor: "pinkCustom.300",
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ChatGptForm;
