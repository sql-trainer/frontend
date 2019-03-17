import React, { Component } from 'react';
import { Header } from '../../common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentEditable from 'react-contenteditable';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Table from './Table';
import QuestionsContainer from './containers/Questions';
import TabsContainer from './containers/Tabs';

import './index.scss';
import './media.scss';

class Training extends Component {
    state = {
        isInputAreaPinned: false,
        SQLCheckingFor: undefined,
        isCheckButtonDisabled: false,
    };

    componentDidMount() {
        document.title = 'Training';
        document.querySelector('.app').className = 'app training-component';
        this.props.loadQuestionsFromAPI();
    }

    handleContentEditable = e => {
        const { currTab } = this.props;

        this.props.changeTabHtml(currTab, e.target.value);
    };

    checkSQL = () => {
        const { tabs, currTab, changeTabResponse } = this.props;
        let newTabs = tabs.map(tab => tab);
        let tab = currTab;

        // API stub
        this.setState({ SQLCheckingFor: currTab });

        fetch('https://api.myjson.com/bins/vez0m')
            .then(res => res.json())
            .then(res => {
                if (res.status === 404) {
                    console.log(res);
                } else {
                    newTabs[currTab].response = res;
                    changeTabResponse(res, tab);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.setState({ SQLCheckingFor: undefined });
            });
    };

    render() {
        const { isInputAreaPinned, SQLCheckingFor, isCheckButtonDisabled } = this.state;
        const { database, isDatabaseLoading, changeTableActivity, tabs, currTab } = this.props;

        return (
            <>
                <Header style={{ minWidth: 900 }} />
                <section className="training">
                    <PerfectScrollbar className="task-info">
                        <QuestionsContainer />
                        <div className="tablesbox" data-loading={isDatabaseLoading}>
                            <div className="title">
                                Схема базы данных
                                <a href="/">
                                    <FontAwesomeIcon
                                        icon="sitemap"
                                        className="db-diagram-icon"
                                        data-tip="Подробная схема базы данных"
                                    />
                                </a>
                            </div>
                            {database === undefined ? (
                                <div className="placeholder">База данных не загружена</div>
                            ) : (
                                database.tables.map((table, index) => {
                                    return (
                                        <div className="table" key={index}>
                                            <div
                                                className={`table-title ${table.active ? 'active' : ''}`}
                                                onClick={e => changeTableActivity(index)}
                                            >
                                                {table.title}
                                            </div>
                                            <div className={`table-props ${table.active ? 'active' : ''}`}>
                                                {table.props.map((prop, index) => (
                                                    <div
                                                        className={`table-prop ${prop.isKey ? 'key' : ''}`}
                                                        key={index}
                                                    >
                                                        <div>{prop.name}</div>
                                                        <div>{prop.type.toUpperCase()}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </PerfectScrollbar>
                    <PerfectScrollbar className="task-editor">
                        <div className={`inputbox ${isInputAreaPinned ? 'pinned' : ''}`}>
                            <TabsContainer isInputAreaPinned={isInputAreaPinned} pinInputArea={this.pinInputArea} />
                            <PerfectScrollbar className="textarea-scrollbar">
                                <ContentEditable
                                    className="textarea"
                                    html={tabs[currTab].html}
                                    onChange={this.handleContentEditable}
                                />
                            </PerfectScrollbar>
                            <button
                                className="check-sql"
                                onClick={this.checkSQL}
                                disabled={isCheckButtonDisabled || SQLCheckingFor !== undefined}
                                data-loading={SQLCheckingFor !== undefined}
                            />
                        </div>
                        <div
                            className={`resultbox ${
                                SQLCheckingFor !== undefined && SQLCheckingFor === currTab ? 'checking' : ''
                            }`}
                        >
                            {tabs[currTab].response ? (
                                <Table
                                    className={`response-table  ${isInputAreaPinned ? 'pinned' : ''}`}
                                    fields={tabs[currTab].response.fields}
                                    rows={tabs[currTab].response.rows}
                                />
                            ) : null}
                        </div>
                    </PerfectScrollbar>
                </section>
            </>
        );
    }
}

export default Training;
