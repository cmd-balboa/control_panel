import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { NavLink } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import { useTranslation } from "react-i18next";

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

    const { t, i18n } = useTranslation();

    const [userRole, setUserRole] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axiosClient.get("/shugoproduct");
                setProducts(productResponse.data.data);

                const advancedInfo = await axiosClient.get("/getAllUsers");
                setAdvancedInfo(advancedInfo.data.data);

                const userResponse = await axiosClient.get("/user");
                setUser(userResponse.data.user);
                setAccount(userResponse.data.account);
                setPersons(userResponse.data.persons);
                setPayLog(userResponse.data.payLog);
                setUserRole(userResponse.data.user.role);
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

    const handleOpenLoginModal = () => {
        setShowLoginModal(true);
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleOpenRegisterModal = () => {
        setShowRegisterModal(true);
    };

    const handleCloseRegisterModal = () => {
        setShowRegisterModal(false);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
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
                                        <h1>{t("header.adminPanel")}</h1>
                                    </NavLink>
                                )}
                            </div>
                            <div>
                                <NavLink
                                    to="/sitee"
                                    className="nav-link"
                                    activeClassName="activeLink"
                                >
                                    <h1>{t("header.site")}</h1>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    to="/dashboard"
                                    className="nav-link"
                                    activeClassName="activeLink"
                                >
                                    <h1>{t("header.dashboard")}</h1>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    to="/download"
                                    className="nav-link"
                                    activeClassName="activeLink"
                                >
                                    <h1>{t("header.download")}</h1>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    to="/donate"
                                    className="nav-link"
                                    activeClassName="activeLink"
                                >
                                    <h1>{t("header.donate")}</h1>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    to="/shugoexpress"
                                    className="nav-link"
                                    activeClassName="activeLink"
                                >
                                    <h1>{t("header.shugoExpress")}</h1>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="playerInfo">
                            <div className="sign">
                                <div className="sign-in">
                                    <button
                                        onClick={handleOpenLoginModal}
                                        id="sign-in"
                                    >
                                        <p>{t("header.login")}</p>
                                    </button>
                                    {showLoginModal && (
                                        <ModalLogin
                                            onClose={handleCloseLoginModal}
                                        />
                                    )}
                                </div>
                                <div className="reg">
                                    <button
                                        onClick={handleOpenRegisterModal}
                                        id="registration"
                                    >
                                        <p>{t("header.register")}</p>
                                    </button>
                                    {showRegisterModal && (
                                        <ModalRegister
                                            onClose={handleCloseRegisterModal}
                                        />
                                    )}
                                </div>
                                <div className="language-selector">
                                    <div className="language-button">
                                        <button className="current-language">
                                            {i18n.language === "en"
                                                ? "English"
                                                : "Русский"}
                                        </button>
                                        <div className="language-dropdown">
                                            <button
                                                className={
                                                    i18n.language === "ru"
                                                        ? "language-item active"
                                                        : "language-item"
                                                }
                                                onClick={() =>
                                                    changeLanguage("ru")
                                                }
                                            >
                                                Русский
                                            </button>
                                            <button
                                                className={
                                                    i18n.language === "en"
                                                        ? "language-item active"
                                                        : "language-item"
                                                }
                                                onClick={() =>
                                                    changeLanguage("en")
                                                }
                                            >
                                                English
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                    <Outlet />
                </main>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
                <footer>
                    <div className="footer-link">
                        <div className="footer-links">
                            <a href="#">
                                <p>{t("privacyPolicy")}</p>
                            </a>
                            <a href="#">
                                <p>{t("userAgreement")}</p>
                            </a>
                            <a href="#">
                                <p>{t("paymentSecurity")}</p>
                            </a>
                        </div>

                        <div className="footer-business">
                            business@worldaion.ru
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
