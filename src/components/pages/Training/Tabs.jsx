import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Tabs extends Component {
    _deleteTab = e => {
        e.stopPropagation();
        this.props.deleteTab();
    };

    render() {
        const { tabs, currTab, isInputAreaPinned, pinInputArea, createNewTab, changeTab } = this.props;

        return (
            <div className="tabs">
                <div>
                    {tabs.map((tab, index) => (
                        <div
                            className={`tab ${currTab === index ? 'active' : ''}`}
                            onClick={e => changeTab(index)}
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
