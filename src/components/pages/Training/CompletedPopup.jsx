import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import store from '../../../modules/store';

class CompletedPopup extends Component {
    resetTest = e => {
        const { addNotification, loadQuestionsFromAPI } = this.props;

        e.preventDefault();

        store.removeItems(['questions', 'testTimestamp', 'lastQuestion']);
        loadQuestionsFromAPI(addNotification, store);
        this.closeCompletedPopup();
    };

    closeCompletedPopup = () => {
        const { changePopupVisibility } = this.props;

        changePopupVisibility();
    };

    render() {
        const { isCompletedPopupVisible } = this.props;

        const className = classNames({ active: isCompletedPopupVisible }, 'test-completed');

        return (
            <div className={className}>
                <FontAwesomeIcon icon="times" className="close-completed-popup" onClick={this.closeCompletedPopup} />
                <h1>Поздравляем!</h1>
                <h2>Вы полностью прошли тест!</h2>
                <h3>
                    Теперь вы можете&nbsp;
                    <a href="/" onClick={this.resetTest}>
                        сбросить
                    </a>
                    &nbsp;свой результат и пройти тест заново, либо посмотреть свои текущие ответы на вопросы, просто
                    перейдя на нужный.
                </h3>
            </div>
        );
    }
}

export default CompletedPopup;
