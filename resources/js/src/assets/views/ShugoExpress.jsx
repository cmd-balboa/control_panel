import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import Modal from "./Modal";
import ProductCard from "./ProductCard";

export default function ShugoExpress() {
    const { products, setUser, persons, user } = useStateContext();
    const [selectedPerson, setSelectedPerson] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isModalOpen, setModalOpen] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState("");
    const [isBtnStoreVisible, setBtnStoreVisible] = useState(true);
    const [lot] = useState("");
    const [selectedProduct, setSelectedProduct] = useState({
        id: "",
        price: "",
        title: "",
        personId: "",
        lot: lot,
    });

    const selectPerson = (ev) => {
        const selectedPersonId = ev.target.value;
        setSelectedPerson(selectedPersonId);
        // Получите значение class_icon из атрибута data-classicon

        console.log(selectedPersonId);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    // const handleLotChange = (event) => {
    //     setLot(event.target.value); // обновляем состояние при изменении значения поля ввода
    // };

    const handleSelectedProduct = (
        ev,
        productId,
        productPrice,
        productTitle,
        lot
    ) => {
        const selectedProductData = {
            id: productId,
            price: productPrice * lot,
            title: productTitle,
            lot: lot,
            personId: selectedPerson,
        };

        setSelectedProduct(selectedProductData);
        // console.log(selectedProductData);
        setModalOpen(true);
    };

    const handleConfirmPurchase = () => {
        setPurchaseStatus("В ОБРАБОТКЕ...");

        axiosClient
            .post("/productPurchase", selectedProduct)
            .then(({ data }) => {
                // console.log(data.user.coin);
                setPurchaseStatus(data.status);
                setUser(data.user);
                console.log(products);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setError(response.data.message);
                    // setSuccess(data.status);
                }
            });
        // console.log(user);
        console.log(selectedProduct);

        setBtnStoreVisible(false);
        return;
    };

    const handleModalClose = () => {
        setBtnStoreVisible(true);

        setSelectedProduct("");
        setPurchaseStatus("");
        // setPrice("");
        setModalOpen();
    };

    const filteredProducts =
        selectedCategory === "all"
            ? Object.values(products)
            : Object.values(products).filter(
                  (product) => product.category === selectedCategory
              );

    return (
        <div className="container">
            <div className="expressBoard animated fadeInDown">
                <div className="expressContent">
                    <div className="express--header">
                        <div className="express--category">
                            {/* <div className="express--category-filter">
                                <select
                                    onChange={handleCategoryChange}
                                    value={selectedCategory}
                                >
                                    <option key="default" value="all">
                                        ВСЕ ПРОДУКТЫ
                                    </option>
                                    {Array.from(
                                        new Set(
                                            Object.values(products).map(
                                                (product) => product.category
                                            )
                                        )
                                    ).map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div> */}
                            <div className="premium">
                                <button></button>
                            </div>
                            <div className="balanceWP">
                                <h3>{user.coin} WP</h3>
                            </div>
                        </div>
                    </div>
                    <div className="express--scroll">
                        <div className="express--products">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    handleSelectedProduct={
                                        handleSelectedProduct
                                    }
                                    lot={lot}
                                />
                            ))}
                            <Modal
                                isOpen={isModalOpen}
                                title={selectedProduct.title}
                                price={selectedProduct.price}
                                onConfirm={handleConfirmPurchase}
                                onClose={handleModalClose}
                                purchaseStatus={purchaseStatus}
                                isBtnStoreVisible={isBtnStoreVisible}
                            />
                        </div>
                    </div>
                </div>
                <div className="expressBurgerMenu">
                    <div className="expressSelect">
                        <div className="selHero">
                            <select
                                className="select-Hero"
                                onChange={selectPerson}
                            >
                                <option
                                    defaultValue={"selectDefault"}
                                    className="selectDefault"
                                    hidden
                                >
                                    Выберите персонажа:
                                </option>

                                {Object.keys(persons).map((key) => (
                                    <option
                                        key={persons[key].id}
                                        value={persons[key].id}
                                        data-classicon={
                                            persons[key].player_class
                                        }
                                    >
                                        {persons[key].name} {persons[key].level}{" "}
                                        LVL
                                    </option>
                                ))}
                            </select>
                            {/* {error && (
                                <div className="error animated fadeInDown">
                                    <p>{error}</p>
                                </div>
                            )}
                            {success && (
                                <div className="success animated fadeInDown">
                                    <p>{success}</p>
                                </div>
                            )} */}
                        </div>
                    </div>
                    <div className={`expressmenu`}>
                        <ul>
                            <li
                                onClick={() => {
                                    handleCategoryChange({
                                        target: { value: "all" },
                                    });
                                }}
                            >
                                <h2> ВСЕ ПРОДУКТЫ</h2>
                            </li>
                            {Array.from(
                                new Set(
                                    Object.values(products).map(
                                        (product) => product.category
                                    )
                                )
                            ).map((category) => (
                                <li
                                    key={category}
                                    onClick={() => {
                                        handleCategoryChange({
                                            target: { value: category },
                                        });
                                    }}
                                >
                                    <h2>{category}</h2>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
