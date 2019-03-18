import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor from 'react-simple-code-editor';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';

import { Header } from '../../common';
import Table from './Table';
import QuestionsContainer from './containers/Questions';
import TabsContainer from './containers/Tabs';

import './index.scss';
import './media.scss';
import 'prismjs/themes/prism.css';

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

    handleContentEditable = value => {
        const { currTab, changeTabHtml } = this.props;
        // this.props.changeTabHtml(currTab, e.currentTarget.textContent);
        changeTabHtml(currTab, value);
    };

    highlightSQL = sql => {
        console.log(sql);
        sql = Prism.highlight(sql, Prism.languages.sql);
        return sql;
    };

    pinInputArea = () => {
        this.setState({ isInputAreaPinned: !this.state.isInputAreaPinned });
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
                                <Editor
                                    value={tabs[currTab].html}
                                    onValueChange={code => this.handleContentEditable(code)}
                                    highlight={code => this.highlightSQL(code)}
                                    className="textarea"
                                    tabSize={4}
                                />
                            </PerfectScrollbar>
                            <button
                                className="check-sql"
                                onClick={this.checkSQL}
                                disabled={
                                    isCheckButtonDisabled ||
                                    (SQLCheckingFor !== undefined && SQLCheckingFor === currTab)
                                }
                                data-loading={SQLCheckingFor !== undefined && SQLCheckingFor === currTab}
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
