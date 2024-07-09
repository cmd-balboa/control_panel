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
                <div class="block_row">
                    <div class="header">
                        <div class="left__bar">
                            <div class="title">
                                <div class="desc">
                                    <h1>WORLD AION</h1>
                                    <p>{t("site.worldTitle")}</p>
                                </div>
                            </div>

                            <div class="decorative_content"></div>
                            <div class="open__desc">
                                <p>{t("site.worldDesc")}</p>
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
                </div>
            </div>
        );
    }
}

export default withTranslation()(Sitee);
