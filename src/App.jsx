import { Routes, Route } from "react-router-dom";
import "./api/axiosDefault";

import { Box } from "@chakra-ui/react";

import HomePage from "./pages/Home";

import RegisterPage from "./pages/Auth/Register";
import LoginPage from "./pages/Auth/Login";

import UserProfile from "./pages/UserProfile/UserProfile";
import UserProfilePasswordUpdate from "./pages/UserProfile/UserProfilePasswordUpdate";
import UserProfileEdit from "./pages/UserProfile/UserProfileEdit";

import NavBar from "./components/Navbar";

import ProtectedRoutes from "./utils/ProtectRoutes";

const App = () => {
  return (
    <>
      <Box position="fixed" top={0} w="100vw" zIndex={5} area="nav">
        <NavBar />
      </Box>

      <Box pt="40px" bg="pinkCustom.50" sx={{ minHeight: "calc(100vh - 40x)" }}>
        <Routes>
          // Add alert for errors
          <Route
            exact
            path="/"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route
            exact
            path="/user-profile/"
            element={
              <ProtectedRoutes>
                <UserProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            exact
            path="/user-profile/update-password/"
            element={
              <ProtectedRoutes>{<UserProfilePasswordUpdate />}</ProtectedRoutes>
            }
          />
          <Route
            exact
            path="/user-profile/edit-info/"
            element={<ProtectedRoutes>{<UserProfileEdit />}</ProtectedRoutes>}
          />
          <Route exact path="/login/" element={<LoginPage />} />
          <Route exact path="/register/" element={<RegisterPage />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </Box>
    </>
  );
};

export default App;
