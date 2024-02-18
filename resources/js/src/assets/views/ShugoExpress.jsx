import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";

export default function ShugoExpress() {
    const { products } = useStateContext();
    const [selectedCategory, setSelectedCategory] = useState("all");

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
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
                            <div className="express--category-filter">
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
                            </div>
                            <div className="premium">
                                <button></button>
                            </div>
                        </div>
                    </div>
                    <div className="express--products">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="product animated fadeInDown"
                            >
                                <div className="image--product">
                                    <div className="ribbon">
                                        <span>SHUGO EXPRESS</span>
                                    </div>
                                    <img src={product.icon} alt="" />
                                </div>
                                <div className="product--information">
                                    <div className="product--title">
                                        <h2>{product.title}</h2>
                                    </div>
                                    <div className="product--price">
                                        <h3>{product.price} WP</h3>
                                    </div>
                                </div>
                                <div className="expressBtn">
                                    <button className="blinkLight">
                                        <p>ДОСТАВКА</p>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
