import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import CustomScrollbars from './CustomScrollbars';

class Tabs extends Component {
    scrollRef = React.createRef();

    componentDidUpdate(prevProps) {
        if (prevProps.tabs.length < this.props.tabs.length && prevProps.currQuestion.id === this.props.currQuestion.id)
            this.scrollRef.current.scrollToRight();
    }

    _deleteTab = e => {
        e.stopPropagation();
        this.props.deleteTab(this.props.currQuestion.id);
        this.props.changeACVisibility(false);
    };

    _createTab = e => {
        this.props.createNewTab(this.props.currQuestion.id);
        this.props.changeACVisibility(false);
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
            changeACVisibility,
        } = this.props;

        return (
            <>
                <div className="tabs">
                    <CustomScrollbars prefix="tabs" scrollRef={this.scrollRef}>
                        {tabs.map((tab, index) => (
                            <div
                                className={classNames('tab', { active: currTabIndex === index })}
                                onClick={e => {
                                    changeTab(index, currQuestion.id);
                                    changeACVisibility(false);
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
