import "./RegisterModal.css";
import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onSubmit, onLogin, activeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [hairType, setHairType] = useState("");
  const [porosity, setPorosity] = useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };
  //   const handleAvatarChange = (evt) => {
  //     setAvatar(evt.target.value);
  //   };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setHairType("");
    setPorosity("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      email,
      password,
      name,
      hairType,
      porosity: porosity.toLowerCase(),
    });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign Up"
      onSubmit={handleSubmit}
      buttonText="Next"
    >
      <label htmlFor="register-email" className="modal__label">
        Email {""}
        <input
          className="modal__input"
          id="register-email"
          type="email"
          name="register-email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          required
        />
      </label>{" "}
      <label htmlFor="register-password" className="modal__label">
        Password {""}
        <input
          className="modal__input"
          id="register-password"
          type="password"
          name="register-password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name {""}
        <input
          className="modal__input"
          id="register-name"
          type="text"
          name="register-name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>
      <label className="modal__label">
        Hair Type
        <select
          className="modal__input"
          value={hairType}
          onChange={(e) => setHairType(e.target.value)}
          required
        >
          <option value="" disabled>
            Select your hair type
          </option>
          {[
            "1A",
            "1B",
            "1C",
            "2A",
            "2B",
            "2C",
            "3A",
            "3B",
            "3C",
            "4A",
            "4B",
            "4C",
          ].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="modal__label">
        Hair Porosity
        <select
          className="modal__input"
          value={porosity}
          onChange={(e) => setPorosity(e.target.value)}
          required
        >
          <option value="" disabled>
            Select porosity
          </option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <button
        className="login-or__btn"
        onClick={() => {
          if (typeof onLogin === "function") onLogin();
        }}
        type="button"
        name="login"
        id="login"
      >
        or Login
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
