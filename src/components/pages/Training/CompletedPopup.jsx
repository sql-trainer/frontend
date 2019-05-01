import React, { Component } from 'react';
import Modal from '../../common/Modal';

class CompletedPopup extends Component {
    render() {
        const { isCompletedPopupVisible, changePopupVisibility } = this.props;

        return (
            <Modal
                opened={isCompletedPopupVisible}
                poseKey="testcompleted"
                onClose={e => changePopupVisibility(false)}
                title=""
                animation="fade"
                fullscreen
            >
                <div className="test-completed">
                    <h2>Вы полностью прошли тест!</h2>
                    <h3>
                        Теперь вы можете&nbsp;
                        <a
                            href="/"
                            onClick={e => {
                                e.preventDefault();
                                changePopupVisibility(false);
                                this.props.resetTest();
                            }}
                        >
                            сбросить
                        </a>
                        &nbsp;свой результат и пройти тест заново, либо посмотреть свои ответы на вопросы.
                    </h3>
                </div>
            </Modal>
        );
    }
}

export default CompletedPopup;
