import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

class CompletedPopup extends Component {
    render() {
        const { isCompletedPopupVisible, changePopupVisibility } = this.props;

        const className = classNames({ active: isCompletedPopupVisible }, 'test-completed');

        return (
            <div className={className}>
                <FontAwesomeIcon
                    icon="times"
                    className="close-completed-popup"
                    onClick={e => changePopupVisibility(false)}
                />
                {/* <h1>Поздравляем!</h1> */}
                <h2>Вы полностью прошли тест!</h2>
                <h3>
                    Теперь вы можете&nbsp;
                    <a
                        href="/"
                        onClick={e => {
                            e.preventDefault();
                            this.props.resetTest();
                        }}
                    >
                        сбросить
                    </a>
                    &nbsp;свой результат и пройти его заново, либо посмотреть свои ответы на вопросы, просто перейдя на
                    нужный.
                </h3>
            </div>
        );
    }
}

export default CompletedPopup;
