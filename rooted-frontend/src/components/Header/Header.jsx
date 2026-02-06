// src/components/Header.jsx
import "./header.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/roundlogo.png";

function Header({
  handleRegisterClick,
  handleLoginClick,
  isLoggedIn,
  handleSignOut,
}) {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <nav className="header__links">
          {isLoggedIn && (
            <>
              <Link to="/">Home</Link>
              {" | "}
              <Link to="/profile">Profile</Link>
              {" | "}
              <Link to="/routine">Routine</Link>\{" "}
            </>
          )}
        </nav>

        <div className="header__auth-btns">
          {!isLoggedIn ? (
            <>
              <button
                className="header__signup"
                onClick={handleRegisterClick}
                type="button"
                name="register"
                id="register"
              >
                Sign Up
              </button>
              <button
                className="header__login"
                onClick={handleLoginClick}
                type="button"
                name="login"
                id="login"
              >
                Log In
              </button>
            </>
          ) : (
            <button className="header__logout" onClick={handleSignOut}>
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
