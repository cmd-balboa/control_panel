import React, { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";

const PurchaseHistory = () => {
    const { purchasedLog, isLoading } = useStateContext();
    const { connectionVipLog } = useStateContext();
    const [activeButton, setActiveButton] = useState("productTable");
    // const [isLoading, setIsLoading] = useState(true); // Добавлено состояние для отслеживания загрузки данных

    const handleButtonClick = (buttonName) => {
        setActiveButton((prevButton) =>
            prevButton === buttonName ? prevButton : buttonName
        );
    };
    const buttons = [
        { label: "ТОВАР", className: "productTable" },
        { label: "VIP", className: "vipTable" },
    ];

    const renderContent = () => {
        switch (activeButton) {
            case "productTable":
                return (
                    <table className="purchase-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ОПИСАНИЕ</th>
                                <th>АККАУНТ</th>
                                <th>ЦЕНА</th>
                                <th>КОЛИЧЕСТВО</th>
                                <th>ДАТА</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(purchasedLog).map((logItem) => (
                                <tr key={logItem.id}>
                                    <td>{logItem.id}</td>
                                    <td>{logItem.title}</td>
                                    <td>{logItem.personName}</td>
                                    <td>{logItem.price}</td>
                                    <td>{logItem.lot}</td>
                                    <td>{logItem.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case "vipTable":
                return (
                    <table className="purchase-table ">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ОПИСАНИЕ</th>
                                <th>АККАУНТ</th>
                                <th>ЦЕНА</th>
                                <th>ДАТА</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(connectionVipLog).map((logItem) => (
                                <tr key={logItem.id}>
                                    <td>{logItem.id}</td>
                                    <td>{logItem.title}</td>
                                    <td>{logItem.account_name}</td>
                                    <td>{logItem.price}</td>
                                    <td>{logItem.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            // Добавьте другие кейсы по необходимости

            default:
                return null;
        }
    };

    const hasPurchases =
        (activeButton === "productTable" &&
            Object.values(purchasedLog).length > 0) ||
        (activeButton === "vipTable" &&
            Object.values(connectionVipLog).length > 0);

    return (
        <div className="container">
            <div className="purchase--history animated fadeInDown">
                <div className="table-history">
                    <div className="table--header animated fadeInDown">
                        {buttons.map((button) => (
                            <button
                                key={button.label}
                                className={
                                    button.className +
                                    (activeButton === button.className
                                        ? " activeHistory"
                                        : "")
                                }
                                onClick={() =>
                                    handleButtonClick(button.className)
                                }
                            >
                                <h1>{button.label}</h1>
                            </button>
                        ))}
                    </div>
                    <div className="purchase--information animated fadeInDown">
                        <div className="information-table">
                            {isLoading ? (
                                <div className="isLoading">
                                    <div className="loading"></div>
                                </div>
                            ) : // <div className="isLoading">
                            //     <div className="loading"></div>
                            // </div>
                            Object.keys(purchasedLog).length > 0 ? (
                                renderContent()
                            ) : (
                                <div className="no--items">
                                    <div className="buy--items">
                                        <p>У ВАС НЕТ ПОКУПОК</p>
                                        <Link to="/shugoexpress">
                                            <button className="blinkLight">
                                                <p>МАГАЗИН</p>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                // <p>У ВАС ЕЩЕ НЕТ ПОКУПОК</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistory;
