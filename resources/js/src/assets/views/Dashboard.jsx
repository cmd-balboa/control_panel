import { useStateContext } from "../../contexts/ContextProvider";
import moment from 'moment'

export default function Dashboard() {
    const {user} = useStateContext();

    return (
        <div className="controlPanel">
                <div className="wrapper">
                    <div className="mainBoard">
                        <div className="account">
                            <div className="accountTitle">
                                <div className="toolBar">
                                    <p>ЛИЧНЫЙ КАБИНЕТ</p>
                                    <div className="settings">
                                        <div className="tool">

                                        </div>
                                        <div className="exitBtn">
                                            <button>ВЫЙТИ</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="username">
                                    {user.name} &nbsp; &nbsp;
                                </div>
                                <div className="payment">
                                    <div className="topUp">
                                        <div className="paymentBoard">
                                            <div className="balanceStatus">
                                                <p>Баланс</p>
                                                <hr />
                                                {user.coin} GP
                                            </div>
                                            <div className="paymentInAccount">
                                                <input type="text" />
                                                <button><p>ПОПОЛНИТЬ</p></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vipAccount">
                                        <div className="statusVipAccount">
                                            <div className="imageVip">
                                            </div>
                                            <p>VIP ACCOUNT</p>
                                        </div>
                                        <button><p>ПРИОБРЕСТИ</p></button>
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
                                        <button><p>MMOTOP</p></button>
                                    </div>
                                    <div className="getPresentBtn">
                                        <button><p>ПОЛУЧИТЬ +5 GP</p></button>
                                    </div>
                                </div>
                            </div>
                            <div className="advanced">
                                <div className="decorative">
                                </div>
                                <div className="advancedTitle">
                                    <p>АККАУНТ</p>
                                </div>
                                <div className="accountDetails">
                                    <div className="create">
                                        <p>Создан:</p>
                                        <h1>{moment(user.created_at).format('YYYY.MM.DD')}</h1>
                                    </div>
                                    <div className="lastVisit">
                                        <p>Последний вход:</p>
                                    </div>
                                    <div className="lastPayment">
                                        <p>Пополнение:</p>
                                    </div>
                                    <div className="vipStatusAccount">
                                        <p>VIP статус:</p>
                                    </div>
                                </div>
                                <div className="decorative">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}