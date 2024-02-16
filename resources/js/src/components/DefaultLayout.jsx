import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const {
        user,
        token,
        setUser,
        setAccount,
        setToken,
        setPersons,
        notification,
        setIsLoading,
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
        axiosClient
            .get("/user")
            .then(({ data }) => {
                console.log(data);
                setUser(data.user);
                setAccount(data.account);
                setPersons(data.persons);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
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
                            <Link to="/dashboard">
                                <h1>ГЛАВНАЯ</h1>
                            </Link>
                        </div>
                        <div>
                            <Link to="/download">
                                <h1 className="active">СКАЧАТЬ</h1>
                            </Link>
                        </div>
                        <div>
                            <Link to="/donate">
                                <h1>ДОНАТ</h1>
                            </Link>
                        </div>
                        <div>
                            <a href="https://worldaion.com/">САЙТ</a>
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
                <footer>
                    <div className="footer-link">
                        <a href="#">
                            <p>Политика конфиденциальности</p>
                        </a>
                        <a href="#">
                            <p>Пользовательское соглашение</p>
                        </a>
                        <a href="#">
                            <p>Безопасность платежей</p>
                        </a>
                        {/* <p>1 GP = 1 RUB</p> */}
                    </div>
                    <div className="social-network">
                        <div className="social-icons">
                            <img id="vk" src="src\img\social_icons\vk.svg" />
                            <img
                                id="telegram"
                                src="src\img\social_icons\telegram.svg"
                            />
                            <img
                                id="discord"
                                src="src\img\social_icons\discord.svg"
                            />
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
