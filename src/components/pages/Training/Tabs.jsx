import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

class Tabs extends Component {
    _deleteTab = (e, qid) => {
        e.stopPropagation();
        this.props.deleteTab(qid);
        this.props.saveTabsToLocalStorage();
    };

    _changeTab(index, id) {
        this.props.changeTab(index, id);
        this.props.saveTabsToLocalStorage();
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
            openHelpModal,
        } = this.props;

        return (
            <>
                <div className="tabs">
                    <div>
                        {tabs.map((tab, index) => (
                            <div
                                className={classNames('tab', { active: currTabIndex === index })}
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
                    <div className="tools">
                        <FontAwesomeIcon
                            className={classNames('tabs-icon pin', isInputAreaPinned ? 'pin-active' : 'pin-inactive')}
                            icon="map-pin"
                            data-tip={isInputAreaPinned ? 'Открепить' : 'Закрепить'}
                            onClick={pinInputArea}
                        />
                        <div className="tool-icon questionmark-icon" data-tip="Справка" onClick={openHelpModal} />
                    </div>
                </div>
            </>
        );
    }
}

export default Tabs;
