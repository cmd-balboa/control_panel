import React from "react";
import { useStateContext } from ".././contexts/ContextProvider/";
import { useState } from "react";

const Payment = () => {
    const { user } = useStateContext();
    const [labelValue, setLabelValue] = useState("0");
    const [sumValue, setSumValue] = useState("");

    const handlePayClick = () => {
        let formattedSumValue = sumValue.replace(/\s/g, ""); // Убираем пробелы

        const newLabelValue = user.id;
        setLabelValue(newLabelValue);
        setSumValue(formattedSumValue); // Устанавливаем отформатированное значение обратно в state
    };

    const handleSumChange = (event) => {
        let inputValue = event.target.value;

        inputValue = inputValue
            .replace(/\D/g, "")
            .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");

        setSumValue(inputValue);
    };

    return (
        <div className="payment-block-yoomoney animated fadeInDown">
            <form
                method="POST"
                // action="https://api.worldaion.com/myform"
                action="https://yoomoney.ru/quickpay/confirm.xml"
            >
                <input type="hidden" name="receiver" value="4100117907658443" />
                <input type="hidden" name="formcomment" value="formcomment" />

                <input type="hidden" name="label" value={labelValue} />
                <input type="hidden" name="firstname" value={user.id} />
                <input type="hidden" name="lastname" value={user.name} />

                <input type="hidden" name="quickpay-form" value="shop" />
                <input type="hidden" name="targets" value="water" />
                <input type="hidden" name="need-fio" value="false" />
                <input type="hidden" name="need-email" value="true" />
                <input type="hidden" name="need-phone" value="false" />
                <input type="hidden" name="need-address" value="false" />
                <input type="hidden" name="paymentType" value="AC" />

                <input
                    type="hidden"
                    name="successURL"
                    value="https://cp.worldaion.com"
                />
                <div className="sum--btn">
                    <div className="sum--enter">
                        <input
                            type="text"
                            name="sum"
                            value={sumValue}
                            data-type="number"
                            placeholder="Введите сумму"
                            onChange={handleSumChange}
                        />
                        <span>₽</span>
                    </div>
                    <button
                        id="payYoomoney"
                        className="blinkPurpleLight"
                        onClick={handlePayClick}
                    >
                        <p>ОПЛАТИТЬ</p>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Payment;
