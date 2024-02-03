import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import moment from "moment";

export default function Settings() {
    const { user, account } = useStateContext();
    const current_emailRef = useRef();
    const emailRef = useRef();
    const password_confirm_emailRef = useRef();

    const current_passwordRef = useRef();
    const passwordRef = useRef();
    const password_confirmationRef = useRef();

    const { setUser, setToken, setAccount } = useStateContext();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setAccount({});
            setToken(null);
        });
    };

    const changePasswordData = (ev) => {
        ev.preventDefault();

        const changePassword = {
            current_password: current_passwordRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: password_confirmationRef.current.value,
            user: password_confirmationRef.current.value,
        };

        axiosClient
            .post("/updatePassword", changePassword)
            .then(({ data }) => {
                setSuccess(data.message);
                setError("");
                console.log(data);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setError(response.data.message);
                    setSuccess("");
                    console.log(response.data);
                }
            });
    };

    const changeEmailData = (ev) => {
        ev.preventDefault();

        const changeEmail = {
            current_email: current_emailRef.current.value,
            email: emailRef.current.value,
            password_confirm_email: password_confirm_emailRef.current.value,
        };

        axiosClient
            .post("/updateEmail", changeEmail)
            .then(({ data }) => {
                console.log(data);
                setSuccess(data.message);
                setError("");
            })

            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setError(response.data.message);
                    setSuccess("");
                }
            });
    };

    return (
        <div className="settingsBoard animated fadeInDown">
            <div className="settingsChange">
                <div className="changeData">
                    <div className="changeTitle">
                        <p>ИЗМЕНЕНИЕ ДАННЫХ АККАУНТА</p>
                        <div className="settings">
                            <Link to="/dashboard">
                                <div className="undo"></div>
                            </Link>
                            <div className="exitBtn">
                                <a href="#" onClick={onLogout}>
                                    <button>ВЫЙТИ</button>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="changeBoard animated fadeInDown">
                        <div className="passwordChangeBoard">
                            <div className="titleChange">
                                <h1>ИЗМЕНЕНИЕ ПАРОЛЯ</h1>
                            </div>
                            <div className="inputData">
                                <div>
                                    <input
                                        ref={current_passwordRef}
                                        type="text"
                                        placeholder="Пароль"
                                    />
                                </div>
                                <div>
                                    <input
                                        ref={passwordRef}
                                        type="text"
                                        placeholder="Новый пароль"
                                    />
                                </div>
                                <div>
                                    <input
                                        ref={password_confirmationRef}
                                        type="text"
                                        placeholder="Подтвердите пароль"
                                    />
                                </div>
                            </div>
                            <div className="btnChangePassword">
                                <button onClick={changePasswordData}>
                                    <h1>ИЗМЕНИТЬ</h1>
                                </button>
                                {error && (
                                    <div className="error animated fadeInDown">
                                        <p>{error}</p>
                                    </div>
                                )}
                                {success && (
                                    <div className="success animated fadeInDown">
                                        <p>{success}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="emailChangeBoard">
                            <div className="passwordChangeBoard">
                                <div className="titleChange">
                                    <h1>ИЗМЕНЕНИЕ ПОЧТЫ</h1>
                                </div>
                                <div className="inputDataEmail">
                                    <div>
                                        <input
                                            ref={current_emailRef}
                                            type="Почта"
                                            placeholder="Почта"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            ref={emailRef}
                                            type="Новая почта"
                                            placeholder="Новая почта"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            ref={password_confirm_emailRef}
                                            type="password"
                                            placeholder="Пароль"
                                        />
                                    </div>
                                </div>
                                <div className="btnChangeEmail">
                                    <button onClick={changeEmailData}>
                                        <h1>ИЗМЕНИТЬ</h1>
                                    </button>
                                    {error && (
                                        <div className="error">
                                            <p>{error}</p>
                                        </div>
                                    )}
                                    {success && (
                                        <div className="success">
                                            <p>{success}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="settingsInfo">
                <div className="advanced">
                    <div className="decorative"></div>
                    <div className="advancedTitle">
                        <h1>ПОСЛЕДНИЕ ИЗМЕНЕНИЯ</h1>
                    </div>
                    <div className="accountDetails">
                        <div className="titleBar">
                            <p>Пароль изменён:</p>
                            <p>Почта изменена:</p>
                            <p>Пополнение:</p>
                            <p>VIP статус:</p>
                        </div>
                        <div className="dataAccount">
                            <h1>
                                {moment(user.created_at).format("YYYY.MM.DD")}
                            </h1>
                            <h1>
                                {moment(account.expire_access_level).format(
                                    "YYYY.MM.DD HH:mm"
                                )}
                            </h1>
                            <h1>
                                {account.activated == 0
                                    ? "Заблокирован"
                                    : "Активен"}
                            </h1>
                            <h1>
                                {account.membership == 0
                                    ? "Неактивен"
                                    : "Активен"}
                            </h1>
                        </div>
                    </div>
                    <div className="decorative"></div>
                </div>
            </div>
        </div>
    );
}
