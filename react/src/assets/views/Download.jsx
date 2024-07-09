import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class Download extends Component {
    render() {
        const { t } = this.props;

        return (
            <div className="container">
                <div className="downloadBoard">
                    <div className="clientBoard animated fadeInDown">
                        <div className="download__row animated fadeInDown">
                            <div className="titleDownload">
                                <p>{t("download.titleDownload")}</p>
                            </div>
                            <div className="downloadBlock">
                                <div className="downloadYandex">
                                    <div className="yandex__row">
                                        <div className="yandexLogo"></div>
                                        <div className="yandexName">
                                            <h1>{t("download.yandexDisk")}</h1>
                                        </div>
                                    </div>
                                    <div className="downloadBtn">
                                        <button className="blinkLight">
                                            <a
                                                href={t(
                                                    "download.links.yandex"
                                                )}
                                            >
                                                <p>
                                                    {t(
                                                        "download.buttons.download"
                                                    )}
                                                </p>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                                <div className="downloadGoogle">
                                    <div className="yandex__row">
                                        <div className="googleLogo"></div>
                                        <div className="yandexName">
                                            <h1>{t("download.googleDisk")}</h1>
                                        </div>
                                    </div>
                                    <div className="downloadBtn">
                                        <button className="blinkLight">
                                            <a
                                                href={t(
                                                    "download.links.google"
                                                )}
                                            >
                                                <p>
                                                    {t(
                                                        "download.buttons.download"
                                                    )}
                                                </p>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="downloadHelp">
                                <div className="helpInfo">
                                    <h1>
                                        {t(
                                            "download.downloadHelp.troubleshooting"
                                        )}
                                    </h1>
                                    <h2>
                                        {t(
                                            "download.downloadHelp.discordServer"
                                        )}
                                    </h2>
                                </div>
                                <div className="helpBtn">
                                    <button className="blinkLight">
                                        <a href={t("download.links.discord")}>
                                            <p>
                                                {t(
                                                    "download.buttons.joinDiscord"
                                                )}
                                            </p>
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

export default withTranslation()(Download);
