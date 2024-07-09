import React, { Component } from "react";

class Download extends Component {
    render() {
        return (
            <div className="container">
                <div className="downloadBoard">
                    <div className="clientBoard animated fadeInDown">
                        <div className="download__row animated fadeInDown">
                            <div className="titleDownload">
                                <p>СКАЧАТЬ КЛИЕНТ</p>
                            </div>
                            <div className="downloadBlock">
                                {/* <div className="downloadTorrent">
                                    <div className="torrent__row">
                                        <div className="torrentLogo"></div>
                                        <div className="torrentName">
                                            <h1>uTORRENT</h1>
                                        </div>
                                    </div>

                                    <div className="downloadBtn">
                                        <button></button>
                                    </div>
                                </div> */}
                                <div className="downloadYandex">
                                    <div className="yandex__row">
                                        <div className="yandexLogo"></div>
                                        <div className="yandexName">
                                            <h1>Yandex Disk</h1>
                                        </div>
                                    </div>
                                    <div className="downloadBtn">
                                        <button className="blinkLight">
                                            <a href="https://disk.yandex.ru/d/2eT-Jn-wNCBVvQ">
                                                <p>СКАЧАТЬ</p>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                                <div className="downloadGoogle">
                                    <div className="yandex__row">
                                        <div className="googleLogo"></div>
                                        <div className="yandexName">
                                            <h1>Google Disk</h1>
                                        </div>
                                    </div>
                                    <div className="downloadBtn">
                                        <button className="blinkLight">
                                            <a href="https://drive.google.com/file/d/1P60L5d3koX-XanRMwActE609Zq7TbP-x/view?usp=drive_link">
                                                <p>СКАЧАТЬ</p>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="downloadHelp">
                                <div className="helpInfo">
                                    <h1>ПОЯВИЛИСЬ ЗАТРУДНЕНИЯ С УСТАНОВКОЙ?</h1>
                                    <h2>
                                        ПРИСОЕДИНЯЙТЕСЬ К НАШЕМУ DISCORD
                                        СЕРВЕРУ, МЫ ОБЯЗАТЕЛЬНО ВАМ ПОМОЖЕМ
                                    </h2>
                                </div>
                                <div className="helpBtn">
                                    <button className="blinkLight">
                                        <a href="https://discord.gg/kyGwe46BDE">
                                            <p>ПРИСОЕДИНИТЬСЯ</p>
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Download;
