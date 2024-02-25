import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";

const PurchaseHistory = () => {
    const { purchasedLog } = useStateContext();
    const { connectionVipLog } = useStateContext();
    const [activeButton, setActiveButton] = useState("productTable");

    const handleButtonClick = (buttonName) => {
        setActiveButton((prevButton) =>
            prevButton === buttonName ? prevButton : buttonName
        );
    };
    const buttons = [
        { label: "ТОВАР", className: "productTable" },
        { label: "VIP", className: "vipTable" },
    ];

    console.log(connectionVipLog);

    const renderContent = () => {
        switch (activeButton) {
            case "productTable":
                return (
                    <table className="purchase-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>NICKNAME</th>
                                <th>PRICE</th>
                                <th>LOT</th>
                                <th>DATE</th>
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
                                <th>TITLE</th>
                                <th>NICKNAME</th>
                                <th>PRICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(connectionVipLog).map((logItem) => (
                                <tr key={logItem.id}>
                                    <td>{logItem.id}</td>
                                    <td>{logItem.title}</td>
                                    <td>{logItem.account_name}</td>
                                    <td>{logItem.price}</td>
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
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistory;
