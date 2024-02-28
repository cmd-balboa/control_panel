import { useStateContext } from "../../contexts/ContextProvider";
import moment from "moment";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useEffect, useState } from "react";
import { format } from "@formkit/tempo";

export default function Dashboard() {
    const {
        user,
        account,
        setUser,
        setToken,
        setAccount,
        persons,
        setPersons,
        isLoading,
    } = useStateContext();

    const [selectedPerson, setSelectedPerson] = useState("");
    const [classIcon, setClassIcon] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [animateClass, setAnimateClass] = useState(false);

    useEffect(() => {
        // При изменении selectedPerson установите класс анимации
        setAnimateClass(true);

        // Очистите класс анимации после завершения анимации (1 секунда)
        const timeoutId = setTimeout(() => {
            setAnimateClass(false);
        }, 500);

        // Очистите таймаут при размонтировании компонента или при следующем изменении selectedPerson
        return () => clearTimeout(timeoutId);
    }, [selectedPerson]);

    const selectPerson = (ev) => {
        const selectedPersonId = ev.target.value;
        setSelectedPerson(selectedPersonId);

        // Получите значение class_icon из атрибута data-classicon
        const selectedClassIcon =
            ev.target.options[ev.target.selectedIndex].getAttribute(
                "data-classicon"
            );

        // Установите имя файла изображения в стейт
        setClassIcon(selectedClassIcon);

        console.log(selectedClassIcon);
        console.log(selectedPersonId);
        console.log(classIcon);
    };

    const RepairHero = (ev) => {
        ev.preventDefault();

        const personId = {
            id: selectedPerson,
        };
        axiosClient
            .post("/repairPerson", personId)
            .then(({ data }) => {
                setSuccess(data.success);
                setError(data.error);
                console.log(data.message);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setError(response.data.message);
                    setSuccess("");
                    // console.log(response.data);
                }
            });
        console.log(personId);
    };

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setAccount({});
            setToken(null);
            setPersons({});
        });
    };

    return (
        <div className="container">
            <div className="controlPanel">
                <div className="mainBoard animated fadeInDown">
                    <div className="account">
                        {isLoading && (
                            <div className="isLoading">
                                <div className="loading"></div>
                            </div>
                        )}
                        {!isLoading && (
                            <div className="accountTitle">
                                <div className="toolBar">
                                    <p>ЛИЧНЫЙ КАБИНЕТ</p>
                                    <div className="settings">
                                        <Link to="/settings">
                                            <div className="tool">
                                                <div className="toolIcon"></div>
                                            </div>
                                        </Link>
                                        <div className="exitBtn">
                                            <a href="#" onClick={onLogout}>
                                                <button>ВЫЙТИ</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="accountBoard animated fadeInDown">
                                    <div className="accountInfo">
                                        <div className="userBoard">
                                            <div className="classIcons">
                                                {classIcon && (
                                                    <img
                                                        src={`assets/classes/${classIcon}.webp`}
                                                        className={`${
                                                            animateClass
                                                                ? "animated fadeInDown"
                                                                : ""
                                                        }`}
                                                    />
                                                )}
                                            </div>
                                            <div className="selHero">
                                                <select
                                                    className="select-Hero"
                                                    onChange={selectPerson}
                                                >
                                                    <option
                                                        defaultValue={
                                                            "selectDefault"
                                                        }
                                                        className="selectDefault"
                                                        hidden
                                                    >
                                                        Выберите персонажа:
                                                    </option>

                                                    {Object.keys(persons).map(
                                                        (key) => (
                                                            <option
                                                                key={
                                                                    persons[key]
                                                                        .id
                                                                }
                                                                value={
                                                                    persons[key]
                                                                        .id
                                                                }
                                                                data-classicon={
                                                                    persons[key]
                                                                        .player_class
                                                                }
                                                            >
                                                                {
                                                                    persons[key]
                                                                        .name
                                                                }{" "}
                                                                {
                                                                    persons[key]
                                                                        .level
                                                                }{" "}
                                                                LVL
                                                            </option>
                                                        )
                                                    )}
                                                </select>
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
                                    </div>
                                    <div className="fixCharacter">
                                        <div
                                            className="fixBtn blinkLight"
                                            onClick={RepairHero}
                                        >
                                            <button>
                                                <p>ПОЧИНИТЬ</p>
                                            </button>
                                        </div>
                                        <h2>
                                            ПЕРСОНАЖ БУДЕТ ПЕРЕМЕЩЁН НА
                                            СТАРТОВУЮ ЛОКАЦИЮ
                                        </h2>
                                    </div>
                                </div>
                                <div className="payment animated fadeInDown">
                                    <div className="topUp">
                                        <div className="paymentBoard">
                                            <div className="bonus--table">
                                                <p>MMOTOP БОНУСЫ</p>
                                            </div>
                                            <div className="bonus--account">
                                                <button
                                                    className="blinkLight"
                                                    id="mmotop-link"
                                                >
                                                    <p>MMTOP</p>
                                                </button>
                                                <button
                                                    className="blinkGreenLight"
                                                    id="mmotop-bonus"
                                                >
                                                    <p>ПОЛУЧИТЬ +5 WP</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vipAccount">
                                        <div className="statusVipAccount">
                                            <div className="imageVip"></div>
                                            <p>VIP ACCOUNT</p>
                                        </div>

                                        <Link to="/shugoexpress">
                                            <button className="blinkLight">
                                                <p>ПОДКЛЮЧИТЬ</p>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* {isLoading && (
                    <div className="isLoading">
                        <div className="loading"></div>
                    </div>
                )} */}
                    <div className="accountStatus">
                        {!isLoading && (
                            <>
                                {/* <div className="bonusCoin">
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
                            </div> */}
                                <div className="achievement">
                                    <div className="achievementTitle">
                                        <p>ДОСТИЖЕНИЯ</p>
                                    </div>
                                    <div className="achievement__row">
                                        <div className="achievementValue">
                                            <h1>0 / 0</h1>
                                        </div>
                                        {/* <Link to="/achievement">
                                        <div className="achievementIcon"></div>
                                    </Link> */}
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
                                                {format({
                                                    format: "D MMMM, YYYY HH:mm",
                                                    date: user.created_at,
                                                    locale: "ru",
                                                    genitive: true,
                                                })}
                                                {/* {moment(user.created_at).format(
                                                    "YYYY.MM.DD"
                                                )} */}
                                            </h1>
                                            <h1>
                                                {format({
                                                    format: "D MMMM, YYYY HH:mm",
                                                    date: account.expire_access_level,
                                                    locale: "ru",
                                                    genitive: true,
                                                })}
                                                {/* {moment(
                                                    account.expire_access_level
                                                ).format("YYYY.MM.DD HH:mm")} */}
                                            </h1>
                                            <h1>
                                                {account.activated == 0
                                                    ? "Заблокирован"
                                                    : "Активен"}
                                            </h1>
                                            <h1>
                                                {/* {format({
                                                    format: "D",
                                                    date: account.daysRemaining,
                                                    locale: "ru",
                                                    genitive: true,
                                                })} */}
                                                {account.daysRemaining}
                                            </h1>
                                            {/* <h1></h1> */}
                                        </div>
                                    </div>
                                    <div className="decorative"></div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
