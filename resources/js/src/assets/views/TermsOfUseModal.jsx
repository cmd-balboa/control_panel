import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, agreement }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modalTerms">
                <div className="agreement">
                    <div className="title-terms">
                        <h3>Пользовательское соглашение</h3>
                    </div>
                    <div className="agreement-table">
                        <div className="title--agreement">
                            <p>1. Лицензия на использование</p>
                            <div className="desc--agreement">
                                <h2>
                                    1.1 Использование сервера подразумевает
                                    соблюдение всех правил и условий,
                                    установленных разработчиками игры AION и
                                    администрацией нашего сервера.
                                </h2>
                            </div>
                        </div>
                        <div className="title--agreement">
                            <p>2. Правила поведения</p>
                            <div className="desc--agreement">
                                <h2>
                                    2.1 Игрок обязуется соблюдать этические
                                    нормы и правила поведения, а также не
                                    нарушать законы страны, в которой он
                                    проживает.
                                </h2>
                                <h2>
                                    2.2 Запрещено использование читов, багов и
                                    других недобросовестных методов для
                                    получения преимуществ в игре.
                                </h2>
                            </div>
                        </div>
                        <div className="title--agreement">
                            <p>3. Благотворительность</p>
                            <div className="desc--agreement">
                                <h2></h2>
                            </div>
                        </div>
                    </div>
                    <div className="btn--agreement blinkLight">
                        <button onClick={agreement}>
                            <h2>ПРИНЯТЬ</h2>
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default Modal;
