import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import CustomScrollbars from './CustomScrollbars';

class Tabs extends Component {
    _deleteTab = e => {
        e.stopPropagation();
        this.props.deleteTab(this.props.currQuestion.id);
        this.props.changeVisibility(false);
    };

    _createTab = e => {
        this.props.createNewTab(this.props.currQuestion.id);
        this.props.changeVisibility(false);
    };

    render() {
        const {
            tabs,
            currTabIndex,
            isInputAreaPinned,
            pinInputArea,
            currQuestion,
            openHelpModal,
            changeTab,
            changeVisibility,
        } = this.props;

        return (
            <>
                <div className="tabs">
                    <CustomScrollbars prefix="tabs">
                        {tabs.map((tab, index) => (
                            <div
                                className={classNames('tab', { active: currTabIndex === index })}
                                onClick={e => {
                                    changeTab(index, currQuestion.id);
                                    changeVisibility(false);
                                }}
                                key={index}
                            >
                                {tab.title}
                                <FontAwesomeIcon icon="times" className="tab-close" onClick={this._deleteTab} />
                            </div>
                        ))}
                    </CustomScrollbars>

                    <FontAwesomeIcon
                        className="tabs-icon add-tab"
                        icon="plus"
                        data-tip="Добавить новую вкладку"
                        data-multiline={false}
                        onClick={this._createTab}
                    />

                    <div className="tools">
                        <div
                            className={classNames('tool-icon pin', { 'pin-active': isInputAreaPinned })}
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
