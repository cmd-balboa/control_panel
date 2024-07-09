import React, { Component } from "react";
import { Link } from "react-router-dom";

class Unavailable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: this.calculateCountdown(),
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                countdown: this.calculateCountdown(),
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    calculateCountdown() {
        // Установите дату, к которой вы хотите сделать отсчет
        const targetDate = new Date("March 8, 2024 20:00:00 GMT+03:00");

        // Получите текущую дату и время
        const currentDate = new Date();

        // Разница в миллисекундах между текущей датой и целевой датой
        const difference = targetDate - currentDate;

        // Преобразуйте разницу в дни, часы, минуты и секунды
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    render() {
        const { countdown } = this.state;

        return (
            <div className="unavailable--cp ">
                <div className="unavailable--date animated fadeInDown">
                    <div className="unavailable--title">
                        <p>ВРЕМЕННО НЕДОСТУПНО</p>
                    </div>
                    <h2>До открытия регистрации осталось:</h2>
                    {/* <div className="open--timer">
                        <span className="open--timer-time">
                            {countdown.days}
                        </span>
                    </div> */}
                    <h2>
                        {countdown.days} дней {countdown.hours} часов{" "}
                        {countdown.minutes} минут {countdown.seconds} секунд
                    </h2>
                </div>
                <div className="btn--back animated fadeInDown">
                    <Link to="/login">
                        <button>
                            <h2>ВЕРНУТЬСЯ НАЗАД</h2>
                        </button>
                    </Link>
                </div>
                <div className="aionworld-support">
                    <div className="aionworld-team animated fadeInDown">
                        <div className="icon--world"></div>
                        <h2>С УВАЖЕНИЕМ,</h2>
                        <h2>КОМАНДА AION WORLD</h2>
                        <div className="icons__raw animated fadeInDown">
                            <div className="icons discord">
                                <a
                                    id="click__Discord"
                                    href="https://discord.gg/kyGwe46BDE"
                                ></a>
                            </div>
                            <div className="icons telegram">
                                <a
                                    id="click__Telegram"
                                    href="https://t.me/aionworld"
                                >
                                    {" "}
                                </a>
                            </div>
                            <div className="icons vk">
                                <a
                                    id="click__Vk"
                                    href="https://vk.com/world.aion"
                                >
                                    {" "}
                                </a>
                            </div>
                            <div className="icons bug">
                                <a id="click__Bug" href="#">
                                    {" "}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Unavailable;
