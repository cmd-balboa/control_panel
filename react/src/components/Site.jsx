import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
        const { t } = this.props; // get the "t" function from this.props

        return (
            <div className="container-site">
                <div className="block_row">
                    <div className="header">
                        <div className="wrapper-site">
                            <div className="header-bg animated fadeInLeft"></div>
                            <div className="site-title">
                                <div className="site-information">
                                    <div className="site-p animated fadeInDown">
                                        <p>{t("site.worldTitle")}</p>
                                    </div>
                                    <div className="site-h animated fadeInDown">
                                        <h2>{t("site.worldDesc")}</h2>
                                    </div>
                                </div>

                                <div className="site-btn animated fadeInDown">
                                    <Link to="/download">
                                        <div className="site-install">
                                            <h2>{t("site.install")}</h2>
                                        </div>
                                    </Link>

                                    {/* <div className="site-registration">
                                        <h2>РЕГИСТРАЦИЯ</h2>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Sitee);
