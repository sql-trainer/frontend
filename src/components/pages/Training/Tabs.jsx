import React, { Component } from 'react';
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
        this.props.changeAutocompletionVisibility(false);
    };

    _createTab = e => {
        this.props.createNewTab(this.props.currQuestion.id);
        this.props.changeAutocompletionVisibility(false);
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
            changeAutocompletionVisibility,
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
                                    changeAutocompletionVisibility(false);
                                }}
                                key={index}
                            >
                                <div>{tab.title}</div>
                                <div className="tab-close" onClick={this._deleteTab} />
                            </div>
                        ))}
                    </CustomScrollbars>

                    <div className="tools">
                        <div
                            className={classNames('tool-icon add-tab')}
                            data-tip="Добавить новую вкладку"
                            onClick={this._createTab}
                        />
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
