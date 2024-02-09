import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import UpgradePage from "./components/pages/upgradePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";
import '../src/stylesheets/App.css';
export const UserContext = createContext();
//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
    <div className="app-layout"> {/* Flex container */}
      <Navbar />
      <div className="main-content-area"> {/* Main content area */}
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/upgrade" element={<UpgradePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
        </Routes>
      </UserContext.Provider>
      </div>
      </div>
    </>
  );
};



export default App
