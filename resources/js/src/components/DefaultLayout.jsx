import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { NavLink } from "react-router-dom";

export default function DefaultLayout() {
    const {
        user,
        token,
        setUser,
        setUsers,
        setAccount,
        setToken,
        setPersons,
        notification,
        setIsLoading,
        setProducts,
        setAdvancedInfo,
        setPurchasedLog,
        setPayLog,
        setConnectionVipLog,
    } = useStateContext();

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axiosClient.get(`/shugoproduct`);
                setProducts(productResponse.data.data);

                const advancedInfo = await axiosClient.get(`/getAllUsers`);
                setAdvancedInfo(advancedInfo.data.data);

                const userResponse = await axiosClient.get("/user");
                setUser(userResponse.data.user);
                setAccount(userResponse.data.account);
                setPersons(userResponse.data.persons);
                setPersons(userResponse.data.persons);
                setPayLog(userResponse.data.payLog);
                setUserRole(userResponse.data.user.role); // Сохраняем роль пользователя
                setPurchasedLog(userResponse.data.purchasedLog);
                setConnectionVipLog(userResponse.data.connectionVipLog);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

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

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div className="content_header">
                        <div className="logoAion"></div>
                        <div className="headerInfo">
                            <div>
                                {userRole === "admin" && (
                                    <NavLink
                                        to="/AdminPanel"
                                        className="nav-link"
                                        activeClassName="activeLink"
                                    >
                                        <h1>ADMIN PANEL</h1>
                                    </NavLink>
                                )}
                            </div>{" "}
                            <div>
                                <NavLink
                                    to="/dashboard"
                                    className="nav-link"
                                    activeClassName="activeLink"
                                >
                                    <h1>ГЛАВНАЯ</h1>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    to="/download"
                                    className="nav-link"
                                    activeClassName="activeLink"
                                >
                                    <h1>СКАЧАТЬ</h1>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    to="/donate"
                                    className="nav-link"
                                    activeClassName="activeLink"
                                >
                                    <h1>ДОНАТ</h1>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    to="/shugoexpress"
                                    className="nav-link"
                                    activeClassName="activeLink"
                                >
                                    <h1>SHUGO EXPRESS</h1>
                                </NavLink>
                            </div>
                            <div>
                                <a href="https://worldaion.com/">
                                    <h1>САЙТ</h1>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* <div className="languageChange">
                        <div className="flag"></div>
                        <p>РУССКИЙ</p>
                        <div className="arrowChange"></div>
                    </div> */}
                    <div>
                        <div className="playerInfo">
                            <div className="information--player">
                                <div className="username">
                                    <p>{user.name}</p>
                                </div>
                                <div className="balance">
                                    <p>{user.coin} WP</p>
                                </div>
                            </div>

                            <div className="exit">
                                <button
                                    onClick={onLogout}
                                    className="btn-logout"
                                    href="#"
                                ></button>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    {/* <div className="backgroundViews"></div> */}
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
                    <div className="footer-business">business@worldaion.ru</div>
                    {/* <div className="social-network">
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
                    </div> */}
                </footer>
            </div>
        </div>
    );
}
