import React, { useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import RecaptchaChange from "../assets/views/recaptcha";
import { useStateContext } from "../contexts/ContextProvider";
// import Modal from "../assets/views/TermsOfUseModal";

const ModalLogin = ({
    editedUser,
    onSaveChanges,
    onClose,
    isLoading,
    setIsLoading,
}) => {
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const nameRef = createRef(); // Add this line
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const { setUser, setToken } = useStateContext();
    const [message, setMessage] = useState(null);

    async function onSubmit(ev) {
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
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message);
                }
            });
    }

    const handleRecaptchaChange = (value) => {
        setRecaptchaToken(value);
    };

    const handleTermsOfUse = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setChecked(false);
        setModalOpen(false);
    };

    const handleAgreement = () => {
        setChecked(true);
        setModalOpen(false);
    };

    const handleOverlayClick = () => {
        onClose();
        setUserData({});
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div
                className="modal-content animated fadeInDown"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`login-signup-form"
            }`}
                >
                    <div className="formWrapper animated fadeInDown">
                        <div className="form">
                            <form onSubmit={onSubmit}>
                                <div className="loginTitle">
                                    <h1 className="title">Авторизоваться</h1>
                                </div>
                                <div className="login">
                                    <input
                                        ref={emailRef}
                                        type="email"
                                        placeholder="Почта"
                                    />
                                    <input
                                        ref={passwordRef}
                                        type="password"
                                        placeholder="Пароль"
                                    />
                                    <RecaptchaChange
                                        onChange={handleRecaptchaChange}
                                    />
                                    {message && (
                                        <div className="alert">
                                            <p>{message}</p>
                                        </div>
                                    )}
                                    <button className="btn btn-block">
                                        Войти
                                    </button>

                                    <p className="message">
                                        Не зарегистрирован?{" "}
                                        <Link to="/signup">
                                            Создать аккаунт
                                        </Link>
                                        {/* <Link to="/unavailable">
                                    Зарегистрироваться
                                </Link> */}
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalLogin;
