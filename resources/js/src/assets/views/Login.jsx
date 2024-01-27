import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import '../../css/index.css';

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <div className={`login-signup-form animated fadeInDown ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login</h1>

          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="input"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="input"
          />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
        <div className="aion__logo">
          <div className="logo">
          </div>
        </div>
        <div
          className={`theme-switch-btn ${isDarkMode ? "dark-mode" : "light-mode"} ${isDarkMode ? "active" : ""}`}
          onClick={toggleTheme}
        >
          <span>{isDarkMode ? "Dark" : "Light"}</span>
        </div>
        {message && (
          <div className="alert">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
