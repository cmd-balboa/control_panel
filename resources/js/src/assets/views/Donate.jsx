import React, { useState } from "react";

const Donate = () => {
    // Состояние для отслеживания активного состояния каждой кнопки
    const [activeButton, setActiveButton] = useState("informationButton");

    // Обработчик событий для изменения состояний при нажатии на кнопки
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName === activeButton ? null : buttonName);
    };

    const buttons = [
        // { label: "ИНФОРМАЦИЯ", className: "informationBu" },
        { label: "ЕНОТ", className: "enotButton" },
        { label: "LAVA", className: "lavaButton" },
        { label: "PAYPALYCH", className: "paypalychButton" },
    ];

    const renderContent = () => {
        switch (activeButton) {
            case "informationButton":
                return (
                    <div>
                        {/* Добавьте дополнительный контент, связанный с ENOTBUTTON */}
                        <div className="donatePay animated fadeInDown">
                            <div className="paymentTitle">
                                <div className="donate--title">
                                    <p>
                                        Делая пожертвование, Вы соглашаетесь с
                                        правилами, изложенными ниже:
                                    </p>
                                </div>
                            </div>
                            <div className="paymentRules animated fadeInDown">
                                <div className="donate--rules">
                                    <li>
                                        Вы соглашаетесь, что WP это награда за
                                        добровольное пожертвование от частного
                                        лица.
                                    </li>
                                    <li>
                                        Пожертвования представляют собой
                                        средства, предоставленные частными
                                        лицами без ожидания получения каких-либо
                                        материальных благ или услуг.
                                    </li>
                                    <li>
                                        Сделав пожертвование, вы осознаете, что
                                        это не является приобретением продукта
                                        или услуги, а скорее способом выражения
                                        благодарности.
                                    </li>
                                    <li>
                                        Чтобы выразить свою благодарность, мы
                                        вознаграждаем доноров в обмен на их
                                        поддержку.
                                    </li>
                                    <li>
                                        Пожертвования направляются на
                                        поддержание работы сервера и развитие
                                        проекта.
                                    </li>
                                    <li>
                                        Вы соглашаетесь, что все сделанные
                                        транзакции являются окончательными и не
                                        подлежат возврату.
                                    </li>
                                    <li>
                                        В случае потери или кражи виртуального
                                        имущества на игровом аккаунте
                                        восстановление не предоставляется.
                                    </li>
                                </div>
                            </div>
                            {/* <div className="btnPay__row">
                                <div className="payInput">
                                    <input type="text" />
                                </div>
                                <div className="payBtn">
                                    <button>
                                        <h2>ПОЛУЧИТЬ WP</h2>
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                );
            case "enotButton":
                return (
                    <div>
                        {/* Добавьте дополнительный контент, связанный с LAVABUTTON */}
                        <div className="btnPay__row">
                            <div className="payInput">
                                <input type="text" />
                            </div>
                            <div className="payBtn">
                                <button>
                                    <h2>ПОЛУЧИТЬ WP</h2>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case "lavaButton":
                return (
                    <div>
                        {/* Добавьте дополнительный контент, связанный с LAVABUTTON */}
                        <div className="btnPay__row">
                            <div className="payInput">
                                <input type="text" />
                            </div>
                            <div className="payBtn">
                                <button>
                                    <h2>ПОЛУЧИТЬ WP</h2>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case "paypalychButton":
                return (
                    <div>
                        {/* Добавьте дополнительный контент, связанный с PAYPALYCHBUTTON */}
                        <div className="btnPay__row">
                            <div className="payInput">
                                <input type="text" />
                            </div>
                            <div className="payBtn">
                                <button>
                                    <h2>ПОЛУЧИТЬ WP</h2>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="container">
                <div className="donateBoard animated fadeInDown">
                    <div className="donateContent">
                        <div className="paymentSystems">
                            <div className="informationPayment">
                                <button
                                    className={`informationButton animated fadeInDown ${
                                        "informationButton" === activeButton
                                            ? "activePayment"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleButtonClick("informationButton")
                                    }
                                >
                                    <h2>ПОДДЕРЖКА И БЛАГОДАРНОСТЬ</h2>
                                </button>
                            </div>
                            <div className="paymentMethods">
                                {buttons.map((button, index) => (
                                    <div
                                        key={index}
                                        className={button.className}
                                    >
                                        <button
                                            className={`${button.className} ${
                                                button.className ===
                                                activeButton
                                                    ? "activePayment"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleButtonClick(
                                                    button.className
                                                )
                                            }
                                        >
                                            <h2>{button.label}</h2>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="additionalContent">
                            {renderContent()}
                            {/* Остальной код вашего компонента */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donate;
