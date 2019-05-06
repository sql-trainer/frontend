import React, { Component, createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import CustomScrollbars from './CustomScrollbars';

class Tabs extends Component {
    _deleteTab = (e, qid) => {
        e.stopPropagation();
        this.props.deleteTab(qid);
    };

    render() {
        const {
            tabs,
            currTabIndex,
            isInputAreaPinned,
            pinInputArea,
            currQuestion,
            openHelpModal,
            createNewTab,
        } = this.props;

        return (
            <>
                <div className="tabs">
                    <CustomScrollbars prefix="tabs">
                        {tabs.map((tab, index) => (
                            <div
                                className={classNames('tab', { active: currTabIndex === index })}
                                onClick={e => this.props.changeTab(index, currQuestion.id)}
                                key={index}
                            >
                                {tab.title}
                                <FontAwesomeIcon
                                    icon="times"
                                    className="tab-close"
                                    onClick={e => this._deleteTab(e, currQuestion.id)}
                                />
                            </div>
                        ))}
                    </CustomScrollbars>

                    <FontAwesomeIcon
                        className="tabs-icon add-tab"
                        icon="plus"
                        data-tip="Добавить новую вкладку"
                        data-multiline={false}
                        onClick={e => {
                            createNewTab(currQuestion.id);
                        }}
                    />

                    <div className="tools">
                        <div
                            className={classNames('tool-icon pin', isInputAreaPinned ? 'pin-active' : 'pin-inactive')}
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
