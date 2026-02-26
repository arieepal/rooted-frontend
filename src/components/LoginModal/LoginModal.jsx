import "./LoginModal.css";
import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function LoginModal({ isOpen, onClose, onSubmit, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log In"
      onSubmit={handleSubmit}
      buttonText="Log in"
    >
      <label htmlFor="name" className="modal__label">
        Email {""}
        <input
          className="modal__input"
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          required
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Password {""}
        <input
          className="modal__input"
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>

      <button
        className="signup-or__btn"
        onClick={() => {
          if (typeof onRegister === "function") onRegister();
        }}
        type="button"
        name="register"
        id="register"
      >
        or Register
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
