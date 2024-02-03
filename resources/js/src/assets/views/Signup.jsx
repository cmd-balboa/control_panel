import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <div className="titleRegistration">
                        <h1 className="title">Registration</h1>
                        {errors && (
                            <div className="alert">
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="loginSignup">
                        <input
                            ref={nameRef}
                            type="text"
                            placeholder="Full Name"
                        />
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Email Address"
                        />
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                        />
                        <input
                            ref={passwordConfirmationRef}
                            type="password"
                            placeholder="Password Confirmation"
                        />
                        <button className="btn btn-block">Signup</button>
                        <p className="message">
                            Already Registered? <Link to="/login">Sign in</Link>
                        </p>
                    </div>
                </form>
                <div className="aion__logo">
                    <div className="logo"></div>
                </div>
            </div>
        </div>
    );
}
