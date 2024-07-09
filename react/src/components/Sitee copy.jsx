import React, { Component } from "react";
import Modal from "./ModalLogin";

class Sitee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };
    render() {
        const { showModal } = this.state;

        return (
            <div className="container">
                <div class="block">
                    <div class="block_row">
                        <div class="header">
                            <div class="left__bar">
                                <div class="title">
                                    <div class="desc">
                                        <h1>WORLD AION</h1>
                                        <p>
                                            ЕДИНЫЙ МИР, БЕСКРАЙНИЕ ВОЗМОЖНОСТИ
                                        </p>
                                    </div>
                                </div>

                                <div class="decorative_content"></div>
                                <div class="open__desc">
                                    <p>
                                        Открой новый мир возможностей! Прими
                                        участие в эксклюзивных испытаниях. Твои
                                        идеи формируют будущее. Заполни анкету
                                        прямо сейчас – будь первым в центре
                                        перемен и получи уникальный доступ к
                                        изменению мира
                                    </p>
                                </div>
                                <div class="event_btn" id="scrollButton">
                                    <button></button>
                                </div>
                                {/* <div className="login">
                                    <button onClick={this.handleOpenModal}>
                                        Login
                                    </button>
                                    {showModal && (
                                        <Modal
                                            onClose={this.handleCloseModal}
                                        />
                                    )}
                                </div> */}
                            </div>
                        </div>
                        <div class="main">
                            <div class="main_content">
                                <div class="about__row about_container">
                                    <div class="about">
                                        <div class="about_title">
                                            <h1>
                                                Успей принять участие в развитии
                                                проекта World Aion с уникальной
                                                версией 4.8. Оставь след в новом
                                                мире и испытай его.
                                            </h1>
                                        </div>
                                    </div>
                                    <div class="about_content">
                                        <div class="block_content">
                                            <img
                                                src="src/img/site/Rectangle_1.jpg"
                                                alt=""
                                            />
                                            <div class="overlay">
                                                <div class="block__position">
                                                    <div class="block_title">
                                                        <p>МИР АЙОНА</p>
                                                    </div>
                                                    <div class="block_desc">
                                                        <p>
                                                            Мы поддерживаем
                                                            качественный игровой
                                                            процесс
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block_content">
                                            <img
                                                src="src/img/site/Rectangle_2.jpg"
                                                alt=""
                                            />
                                            <div class="overlay">
                                                <div class="block__position">
                                                    <div class="block_title">
                                                        <p>УНИКАЛЬНАЯ ВЕРСИЯ</p>
                                                    </div>
                                                    <div class="block_desc">
                                                        <p>
                                                            Переработанный Aion
                                                            4.8 заставит вас
                                                            насладиться игрой
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block_content">
                                            <img
                                                src="src/img/site/Rectangle_3.jpg"
                                                alt=""
                                            />
                                            <div class="overlay">
                                                <div class="block__position">
                                                    <div class="block_title">
                                                        <p>НОВЫЕ ПРИКЛЮЧЕНИЯ</p>
                                                    </div>
                                                    <div class="block_desc">
                                                        <p>
                                                            Будь среди первых,
                                                            кто ощутит просторы
                                                            бескрайнего мира
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block_content">
                                            <img
                                                // src="img/site/Rectangle_4.jpg"
                                                src="src/img/site/Rectangle_4.jpg"
                                                alt=""
                                            />
                                            <div class="overlay">
                                                <div class="block__position">
                                                    <div class="block_title">
                                                        <p>
                                                            АЛЬФА ТЕСТИРОВАНИЕ
                                                        </p>
                                                    </div>
                                                    <div class="block_desc">
                                                        <p>
                                                            Набор разработчиков
                                                            и энтузиастов для
                                                            развития проекта
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <section class="splide">
                                    <div class="splide__track">
                                        <ul class="splide__list">
                                            <li class="splide__slide">
                                                <div class="splide__slide__container">
                                                    <div class="splide__slide_image">
                                                        <img src="img/site/slider/soon.jpeg" />
                                                    </div>
                                                    <div class="text-overlay">
                                                        <p>
                                                            УСПЕЙ ПРИНЯТЬ
                                                            УЧАСТИЕ
                                                        </p>
                                                        <h2>
                                                            Тестировщики успешно
                                                            запущены на сервер!
                                                            Мы приглашаем Вас
                                                            присоединиться к ним
                                                            и начать свое
                                                            приключение.
                                                        </h2>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="splide__slide">
                                                <div class="splide__slide__container">
                                                    <div class="splide__slide_image">
                                                        <img src="img/site/slider/enshar.jpg" />
                                                    </div>
                                                    <div class="text-overlay">
                                                        <p>ENSHAR</p>
                                                        <h2>
                                                            Является правой
                                                            половиной
                                                            затопленного
                                                            континента, который
                                                            был обнаружен во
                                                            время Перемещения. С
                                                            тех пор его заняли
                                                            асмодиане, и теперь
                                                            он служит основной
                                                            зоной прокачки для
                                                            персонажей Асмодиан
                                                        </h2>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="splide__slide">
                                                <div class="splide__slide__container">
                                                    <div class="splide__slide_image">
                                                        <img src="img/site/slider/cygnea.jpg" />
                                                    </div>
                                                    <div class="text-overlay">
                                                        <p>CYGNEA</p>
                                                        <h2>
                                                            Левая половина
                                                            затопленного
                                                            континента,
                                                            обнаруженного во
                                                            время Перемещения. С
                                                            тех пор ее заняли
                                                            элиосы, и теперь она
                                                            служит зоной
                                                            прокачки для
                                                            персонажей Элийцев
                                                        </h2>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </section> */}
                                    <div class="call_back">
                                        <div class="contact__row">
                                            <div class="contact">
                                                <div class="contact_title">
                                                    <h1>
                                                        ПРИСОЕДИНЯЙСЯ К КОМАНДЕ
                                                        AION WORLD!
                                                    </h1>
                                                </div>
                                                <div class="navigation-container">
                                                    <div class="navigation-block">
                                                        <div class="step step-main">
                                                            <div class="step-survey">
                                                                <div class="survey--title">
                                                                    <p>1 ШАГ</p>
                                                                    <h2>
                                                                        Пройдите
                                                                        анкетирование
                                                                    </h2>
                                                                </div>
                                                                <hr />
                                                                <div class="survey--image"></div>
                                                                <div class="survey--button">
                                                                    <button>
                                                                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdloVWUBJm80XpePVyuHlrwTMI4Pq-lq1PYcpWMIZMtu59wYw/viewform?usp=sf_link">
                                                                            <h2>
                                                                                АНКЕТИРОВАНИЕ
                                                                            </h2>
                                                                        </a>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="step">
                                                            <div class="step-survey">
                                                                <div class="survey--title">
                                                                    <p>2 ШАГ</p>
                                                                    <h2>
                                                                        Зайдите
                                                                        в наш
                                                                        дискорд
                                                                        сервер
                                                                    </h2>
                                                                </div>
                                                                <hr />
                                                                <div class="survey--image-discord"></div>
                                                                <div class="survey--button-discord">
                                                                    <button>
                                                                        <a href="https://discord.gg/kyGwe46BDE">
                                                                            <h2>
                                                                                DISCORD
                                                                            </h2>
                                                                        </a>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="step">
                                                            <div class="step-survey">
                                                                <div class="survey--title">
                                                                    <p>3 ШАГ</p>
                                                                    <h2>
                                                                        Зарегистрируйтесь
                                                                        и
                                                                        скачайте
                                                                        клиент в
                                                                        личном
                                                                        кабинете
                                                                    </h2>
                                                                </div>
                                                                <hr />

                                                                <div class="survey--image-cp"></div>

                                                                <div class="survey--button-discord">
                                                                    <button>
                                                                        <a href="https://cp.worldaion.com/register">
                                                                            <h2>
                                                                                ЛИЧНЫЙ
                                                                                КАБИНЕТ
                                                                            </h2>
                                                                        </a>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="social_icons">
                                                    <div class="icons__raw">
                                                        <div class="icon discord">
                                                            <a
                                                                id="click__Discord"
                                                                href="https://discord.gg/kyGwe46BDE"
                                                            ></a>
                                                        </div>
                                                        <div class="icon telegram">
                                                            <a
                                                                id="click__Telegram"
                                                                href="https://t.me/aionworld"
                                                            >
                                                                {" "}
                                                            </a>
                                                        </div>
                                                        <div class="icon vk">
                                                            <a
                                                                id="click__Vk"
                                                                href="https://vk.com/world.aion"
                                                            >
                                                                {" "}
                                                            </a>
                                                        </div>
                                                        <div class="icon bug">
                                                            <a
                                                                id="click__Bug"
                                                                href="#"
                                                            >
                                                                {" "}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="footer_copyright">
                                                    <div class="footer_text">
                                                        Сервер World Aion не
                                                        является официальным
                                                        сервером игры Aion и
                                                        предоставляется
                                                        исключительно
                                                        <br />
                                                        в ознакомительных целях.
                                                        Все товарные знаки
                                                        являются собственностью
                                                        соответствующих
                                                        правообладателей NCSoft.
                                                        <br />
                                                        <br />
                                                        ©
                                                        <br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sitee;
