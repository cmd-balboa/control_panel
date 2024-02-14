import React, { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import RecaptchaChange from "./recaptcha";
import "../../css/index.css";

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const [recaptchaToken, setRecaptchaToken] = useState(null); // Используйте состояние для хранения токена
    const { setUser, setToken } = useStateContext();
    const [message, setMessage] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [skin, skinSet] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
        skinSet((prevMode) => !prevMode);
    };

    const handleRecaptchaChange = (value) => {
        setRecaptchaToken(value);
    };

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            recaptchaToken: recaptchaToken,
        };

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message);
                }
            });
    };

    return (
        <div
            className={`login-signup-form ${
                isDarkMode ? "dark-theme" : "light-theme"
            }`}
        >
            <div
                className={`skinWhite animatedSwipe fadeInLeft ${
                    skin ? "skinVisible" : "skinHide"
                }`}
            ></div>
            <div className="formWrapper animated fadeInDown">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <div className="loginTitle">
                            <h1 className="title">Login</h1>
                        </div>
                        <div className="login">
                            <input
                                ref={emailRef}
                                type="email"
                                placeholder="Email"
                            />
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder="Password"
                            />
                            <RecaptchaChange onChange={handleRecaptchaChange} />

                            <button className="btn btn-block">Login</button>
                            <p className="message">
                                Not registered?{" "}
                                <Link to="/signup">Create an account</Link>
                            </p>
                        </div>
                    </form>
                    {message && (
                        <div className="alert">
                            <p>{message}</p>
                        </div>
                    )}
                </div>
            </div>
            <div
                className={`theme-switch-btn ${
                    isDarkMode ? "dark-mode" : "light-mode"
                } ${isDarkMode ? "active" : ""}`}
                onClick={toggleTheme}
            >
                <span>{isDarkMode ? "Dark" : "Light"}</span>
            </div>
            <div
                className={`skinBlack animatedSwipe fadeInRight ${
                    skin ? "skinHide" : "skinVisible"
                }`}
            ></div>
        </div>
    );
}
