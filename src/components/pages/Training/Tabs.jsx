import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import store from '../../../modules/store';

class Tabs extends Component {
    _deleteTab = (e, qid) => {
        e.stopPropagation();
        this.props.deleteTab(qid);
        store.set('tabs', this.props.allTabs);
    };

    _changeTab(index, id) {
        this.props.changeTab(index, id);
        store.set('tabs', this.props.allTabs);
    }

    render() {
        const {
            tabs,
            currTabIndex,
            isInputAreaPinned,
            pinInputArea,
            createNewTab,
            questions,
            currQuestionIndex,
        } = this.props;

        return (
            <div className="tabs">
                <div>
                    {tabs.map((tab, index) => (
                        <div
                            className={`tab ${currTabIndex === index ? 'active' : ''}`}
                            onClick={e => this._changeTab(index, questions[currQuestionIndex].id)}
                            key={index}
                        >
                            {tab.title}
                            <FontAwesomeIcon
                                icon="times"
                                className="tab-close"
                                onClick={e => this._deleteTab(e, questions[currQuestionIndex].id)}
                            />
                        </div>
                    ))}
                    <FontAwesomeIcon
                        className="tabs-icon"
                        icon="plus"
                        data-tip="Добавить новую вкладку"
                        onClick={e => {
                            createNewTab(questions[currQuestionIndex].id);
                        }}
                    />
                </div>
                <FontAwesomeIcon
                    className={`tabs-icon pin ${isInputAreaPinned ? 'pin-active' : ''}`}
                    icon="thumbtack"
                    data-tip={isInputAreaPinned ? 'Открепить' : 'Закрепить'}
                    onClick={pinInputArea}
                />
            </div>
        );
    }
}

export default Tabs;
