import React, { useState } from "react";
import { Button, Input, Box } from "@chakra-ui/react";

const LocationInput = ({ onLocationFetch }) => {
  const [input, setInput] = useState("");

  const handleFetchLocation = async () => {
    const response = await fetch("/.netlify/functions/geocode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: input }),
    });

    if (response.ok) {
      const { latitude, longitude } = await response.json();
      console.log(latitude, longitude);
      onLocationFetch(latitude, longitude);
    } else {
      console.error("Failed to fetch location");
    }
  };

  return (
    <Box>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter postcode or town"
      />
      <Button onClick={handleFetchLocation} mt={2}>
        Fetch Location
      </Button>
    </Box>
  );
};

export default LocationInput;
