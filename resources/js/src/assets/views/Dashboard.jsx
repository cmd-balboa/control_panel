import { useStateContext } from "../../contexts/ContextProvider";
import moment from "moment";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";

export default function Dashboard() {
    const { user, account, setUser, setToken, setAccount } = useStateContext();

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setAccount({});
            setToken(null);
        });
    };

    return (
        <div className="controlPanel">
            <div className="mainBoard animated fadeInDown">
                <div className="account">
                    <div className="accountTitle">
                        <div className="toolBar">
                            <p>ЛИЧНЫЙ КАБИНЕТ</p>
                            <div className="settings">
                                <Link to="/settings">
                                    <div className="tool"></div>
                                </Link>
                                <div className="exitBtn">
                                    <a href="#" onClick={onLogout}>
                                        <button>ВЫЙТИ</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="username">
                            {user.name} &nbsp; &nbsp;
                        </div>
                        <div className="payment animated fadeInDown">
                            <div className="topUp">
                                <div className="paymentBoard">
                                    <div className="balanceStatus">
                                        <p>Баланс</p>
                                        <hr />
                                        {user.coin} GP
                                    </div>
                                    <div className="paymentInAccount">
                                        <input type="text" />
                                        <button>
                                            <p>ПОПОЛНИТЬ</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="vipAccount">
                                <div className="statusVipAccount">
                                    <div className="imageVip"></div>
                                    <p>VIP ACCOUNT</p>
                                </div>
                                <button>
                                    <p>ПРИОБРЕСТИ</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accountStatus">
                    <div className="bonusCoin">
                        <div className="bonusTitle">
                            <p>БОНУСЫ</p>
                        </div>
                        <div className="mmotopBonus">
                            <div className="mmotopBtn">
                                <button>
                                    <p>MMOTOP</p>
                                </button>
                            </div>
                            <div className="getPresentBtn">
                                <button>
                                    <p>ПОЛУЧИТЬ +5 GP</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="advanced">
                        <div className="decorative"></div>
                        <div className="advancedTitle">
                            <p>АККАУНТ</p>
                        </div>
                        <div className="accountDetails">
                            <div className="titleBar">
                                <p>Создан:</p>
                                <p>Последний вход:</p>
                                <p>Статус аккаунта:</p>
                                <p>VIP статус:</p>
                            </div>
                            <div className="dataAccount">
                                <h1>
                                    {moment(user.created_at).format(
                                        "YYYY.MM.DD"
                                    )}
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
        </div>
    );
}
