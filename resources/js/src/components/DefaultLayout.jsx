import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const {
        user,
        token,
        account,
        setUser,
        setAccount,
        setToken,
        notification,
    } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            console.log(data);
            setUser(data.user);
            setAccount(data.account);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>
                        <div className="logoAion"></div>
                    </div>
                    <div className="headerInfo">
                        <div>
                            <a href="#" className="active">
                                ГЛАВНАЯ
                            </a>
                        </div>
                        <div>
                            <a href="#">СКАЧАТЬ</a>
                        </div>
                        <div>
                            <a href="#">ПРЕМИУМ</a>
                        </div>
                        <div>
                            <a href="#">САЙТ</a>
                        </div>
                    </div>
                    <div className="languageChange">
                        <div className="flag"></div>
                        <p>РУССКИЙ</p>
                        <div className="arrowChange"></div>
                    </div>
                    <div>
                        <div className="playerInfo">
                            <div className="username">
                                {user.name} &nbsp; &nbsp;
                            </div>
                            <hr />
                            <div className="balance">
                                <p>Баланс:</p>
                                {user.coin} &nbsp; &nbsp;
                            </div>
                        </div>

                        {/* <a onClick={onLogout} className="btn-logout" href="#">
                            Logout
                        </a> */}
                    </div>
                </header>
                <div className="backgroundViews"></div>
                <main>
                    <Outlet />
                </main>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
            </div>
        </div>
    );
}
