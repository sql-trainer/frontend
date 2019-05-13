import React, { Component } from 'react';
import Modal from '../../common/Modal';

import { StatisticsBlockContainer as StatisticsBlock } from './containers/StatisticsBlock';

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
                    <h2>Тест завершён!</h2>
                    <h3>
                        Теперь вы можете&nbsp;
                        <a
                            href="/"
                            onClick={e => {
                                e.preventDefault();
                                this.props.resetTest();
                                changePopupVisibility(false);
                            }}
                        >
                            сбросить
                        </a>
                        &nbsp;свой результат и пройти тест заново, либо посмотреть свои ответы на вопросы.
                    </h3>
                    <StatisticsBlock
                        style={{ maxWidth: '900px', marginTop: '30px', width: '100%' }}
                        markLabel="Итоговый балл"
                    />
                </div>
            </Modal>
        );
    }
}

export default CompletedPopup;
