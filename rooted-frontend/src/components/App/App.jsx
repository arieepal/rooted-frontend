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

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  //Modal controls
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

  // --- Register a new user ---
  const handleRegister = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      ...userData,
      photos: [
        { file: null, date: "" },
        { file: null, date: "" },
        { file: null, date: "" },
        { file: null, date: "" },
      ],
      hairProfile: {
        hairType: userData.hairType || "",
        porosity: userData.porosity || "",
      },
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", newUser.email); // track who is logged in

    setUser(newUser);
    setIsLoggedIn(true);
    closeActiveModal();
    navigate("/profile");
  };

  // --- Login existing user ---
  const handleLogin = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.email === userData.email);

    if (!foundUser) {
      alert("User not found");
      return;
    }

    localStorage.setItem("currentUserEmail", foundUser.email);

    setUser(foundUser);
    setIsLoggedIn(true);
    closeActiveModal();
    navigate("/profile");
  };

  // --- Sign out ---
  const handleSignOut = () => {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
    // Clear photos state
  };

  useEffect(() => {
    const email = localStorage.getItem("currentUserEmail");
    if (!email) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find((u) => u.email === email);

    if (currentUser) {
      setUser(currentUser);
      setIsLoggedIn(true);
    }
  }, []);

  return (
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
              isLoggedIn ? (
                <Profile user={user} setUser={setUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/routine"
            element={isLoggedIn ? <Routine user={user} /> : <Navigate to="/" />}
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
  );
}

export default App;
