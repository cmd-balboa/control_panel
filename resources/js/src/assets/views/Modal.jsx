import ReactDOM from "react-dom";

const Modal = ({
    isOpen,
    title,
    price,
    onConfirm,
    onClose,
    purchaseStatus,
    isBtnStoreVisible,
    lot,
}) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal">
                {isBtnStoreVisible && (
                    <div className="modal--content">
                        <div className="modalTitle">
                            <p>{`Хотите подтвердить доставку? ${title} за ${
                                lot == 0 ? price : price * lot
                            } WP?`}</p>
                        </div>
                        <div className="btnStore">
                            {" "}
                            <button
                                id="confirm"
                                onClick={onConfirm}
                                className="blinkLight"
                            >
                                <p>ПОДТВЕРДИТЬ</p>
                            </button>
                            {/* <button
                                id="close"
                                onClick={onClose}
                                className="blinkLight"
                            >
                                <p>ОТМЕНА</p>
                            </button> */}
                        </div>
                    </div>
                )}
                <div id="purchaseStatus">
                    <p>{purchaseStatus}</p>
                </div>
            </div>
        </>,
        document.body
    );
};

export default Modal;
