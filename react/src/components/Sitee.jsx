import React, { Component } from "react";
import { withTranslation } from "react-i18next";

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
                        <div className="left__bar">
                            <div className="title">
                                <div className="desc">
                                    <h1>WORLD AION</h1>
                                    <p>{t("site.worldTitle")}</p>
                                </div>
                            </div>

                            <div className="decorative_content"></div>
                            <div className="open__desc">
                                <p>{t("site.worldDesc")}</p>
                            </div>
                            <div className="event_btn" id="scrollButton">
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
                </div>
            </div>
        );
    }
}

export default withTranslation()(Sitee);
