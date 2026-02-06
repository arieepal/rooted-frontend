import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import "./index.css";
import "../../vendor/normalize.css";

import Header from "../Header";
import Footer from "../Footer";

import Home from "../../pages/Home";
import Profile from "../../pages/Profile/Profile";
import Routine from "../../pages/Routine/Routine";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

// import * as auth from "../../utils/auth";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  //Mock user
  // const mockUser = {
  //   name: "Arielle",
  //   hairType: "3C",
  //   porosity: "Low",
  //   routines: [
  //     { id: 1, name: "Moisturize", frequency: "Daily" },
  //     { id: 2, name: "Deep Condition", frequency: "Weekly" },
  //   ],
  // };

  //Modal controls
  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  //Mvp auth
  const handleRegister = (userData) => {
    const newUser = {
      name: userData.name,
      hairType: userData.hairType,
      porosity: userData.porosity,
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(newUser));
    closeActiveModal();
    navigate("/profile");
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    closeActiveModal();
    navigate("/profile");
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className="app">
        <Header
          handleRegisterClick={handleRegisterClick}
          handleLoginClick={handleLoginClick}
          isLoggedIn={isLoggedIn}
          handleSignOut={handleSignOut}
        />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                isLoggedIn ? <Profile user={user} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/routine"
              element={
                isLoggedIn ? <Routine user={user} /> : <Navigate to="/" />
              }
            />
          </Routes>
        </main>

        <RegisterModal
          isOpen={activeModal === "register"}
          onSubmit={handleRegister}
          onLogin={handleLoginClick}
          onClose={closeActiveModal}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onSubmit={handleLogin}
          onRegister={handleRegisterClick}
          onClose={closeActiveModal}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
