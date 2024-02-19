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
        setProducts,
    } = useStateContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axiosClient.get(`/shugoproduct`);
                setProducts(productResponse.data.data);
                console.log(productResponse.data.data);

                const userResponse = await axiosClient.get("/user");
                console.log(userResponse.data);
                setUser(userResponse.data.user);
                setAccount(userResponse.data.account);
                setPersons(userResponse.data.persons);
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
                                <h1>СКАЧАТЬ</h1>
                            </Link>
                        </div>
                        <div>
                            <Link to="/donate">
                                <h1>ДОНАТ</h1>
                            </Link>
                        </div>
                        <div>
                            <Link to="/shugoexpress">
                                <h1>SHUGO EXPRESS</h1>
                            </Link>
                        </div>
                        <div>
                            <a href="https://worldaion.com/">
                                <h1>САЙТ</h1>
                            </a>
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
