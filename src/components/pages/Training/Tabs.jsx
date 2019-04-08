import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import store from '../../../modules/store';

class Tabs extends Component {
    _deleteTab = e => {
        e.stopPropagation();
        this.props.deleteTab();
        store.set('questions', this.props.questions);
    };

    _changeTab(index) {
        this.props.changeTab(index);
        store.set('questions', this.props.questions);
    }

    render() {
        const { tabs, currTabIndex, isInputAreaPinned, pinInputArea, createNewTab } = this.props;

        return (
            <div className="tabs">
                <div>
                    {tabs.map((tab, index) => (
                        <div
                            className={`tab ${currTabIndex === index ? 'active' : ''}`}
                            onClick={e => this._changeTab(index)}
                            key={index}
                        >
                            {tab.title}
                            <FontAwesomeIcon icon="times" className="tab-close" onClick={this._deleteTab} />
                        </div>
                    ))}
                    <FontAwesomeIcon
                        className="tabs-icon"
                        icon="plus"
                        data-tip="Добавить новую вкладку"
                        onClick={createNewTab}
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
