import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { UserProfileProvider } from "./contexts/UserProfileContext";
import { PartnerProfileProvider } from "./contexts/PartnerProfileContext";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import customTheme from "../theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <CurrentUserProvider>
          <UserProfileProvider>
            <PartnerProfileProvider>
              <App />
            </PartnerProfileProvider>
          </UserProfileProvider>
        </CurrentUserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
