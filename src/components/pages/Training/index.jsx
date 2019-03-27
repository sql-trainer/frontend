import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor from 'react-simple-code-editor';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NotificationSystem from 'react-notification-system';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';

import { Header } from '../../common';
import Table from './Table';
import QuestionsContainer from './containers/Questions';
import TabsContainer from './containers/Tabs';

import './index.scss';
import './media.scss';
import 'prismjs/themes/prism.css';
import { changeSolvedQuestionSQL } from '../../../store/actions/questionActions';

class Training extends Component {
    state = {
        isInputAreaPinned: false,
        SQLCheckingFor: undefined,
        isCheckButtonDisabled: false,
        checkResponseType: '',
        isTestCompleted: false,
        isCompletedPopupVisible: false,
    };

    notificationSystem = React.createRef();

    addNotification = ({ message, level }) => {
        const notification = this.notificationSystem.current;
        if (notification) {
            notification.addNotification({
                message,
                level,
                autoDismiss: 4,
                dismissible: 'click',
            });
        }
    };

    componentDidMount() {
        const { questions } = this.props;
        document.title = 'Training';
        document.querySelector('.app').className = 'app training-component';
        if (!questions.length) this.props.loadQuestionsFromAPI(this.addNotification);
    }

    handleContentEditable = value => {
        const { currTab, changeTabHtml } = this.props;
        changeTabHtml(currTab, value);
    };

    highlightSQL = sql => {
        sql = Prism.highlight(sql, Prism.languages.sql);
        return sql;
    };

    pinInputArea = () => {
        this.setState({ isInputAreaPinned: !this.state.isInputAreaPinned });
    };

    checkSQL = e => {
        const {
            tabs,
            currTab,
            changeTabResponse,
            questions,
            currQuestion,
            changeQuestionStatus,
            isTestCompleted,
        } = this.props;
        let tab = currTab;

        this.setState({ SQLCheckingFor: tab });

        setTimeout(() => {
            const sql = tabs[currTab].html;
            fetch(`http://localhost:8080/api/v1/tests/open/questions/${questions[currQuestion].id}/check`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sql }),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        this.setState({ checkResponseType: 'error' });
                        this.addNotification({ message: res.error.message, level: 'error' });
                    } else {
                        this.setState({ checkResponseType: res.success ? 'success' : 'error' });
                        if (res.success) {
                            changeQuestionStatus('solved');
                            changeSolvedQuestionSQL(sql);
                        }
                        changeTabResponse(tab, { fields: res.fields, rows: res.rows });
                        if (!isTestCompleted && this.checkTestResult())
                            this.setState({ isTestCompleted: true, isCompletedPopupVisible: true });
                    }
                })
                .catch(err => this.addNotification({ message: 'Ошибка сервера', level: 'error' }))
                .finally(() => {
                    this.setState({ SQLCheckingFor: undefined });
                    setTimeout(() => {
                        this.setState({ checkResponseType: '' });
                    }, 1000);
                });
        }, 500);
    };

    nextQuestion = () => {
        const { questions, currQuestion } = this.props;
        const newQuestion = currQuestion + 1 > questions.length - 1 ? 0 : currQuestion + 1;

        this.setCurrQuestion(newQuestion);
    };

    prevQuestion = () => {
        const { questions, currQuestion } = this.props;
        const newQuestion = currQuestion - 1 < 0 ? questions.length - 1 : currQuestion - 1;

        this.setCurrQuestion(newQuestion);
    };

    setCurrQuestion = index => {
        const {
            questions,
            loadDatabaseFromAPI,
            database,
            changeCurrQuestion,
            deleteAllTabs,
            addNotification,
        } = this.props;

        if (!database || questions[index].database !== database.id) {
            loadDatabaseFromAPI(questions[index].database, addNotification);
        }

        changeCurrQuestion(index);

        deleteAllTabs();
    };

    checkTestResult = () => {
        const { questions } = this.props;
        return questions.findIndex(q => q.status !== 'solved') === -1;
    };

    render() {
        const { isInputAreaPinned, SQLCheckingFor, checkResponseType, isCompletedPopupVisible } = this.state;
        const { database, isDatabaseLoading, changeTableActivity, tabs, currTab, questions, currQuestion } = this.props;

        return (
            <>
                <Header style={{ minWidth: 900 }} />
                <section className="training">
                    <PerfectScrollbar className="task-info">
                        <QuestionsContainer
                            setCurrQuestion={this.setCurrQuestion}
                            nextQuestion={this.nextQuestion}
                            prevQuestion={this.prevQuestion}
                        />
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
                                className={`check-sql ${checkResponseType}${
                                    questions.length && questions[currQuestion].status === 'solved' ? ' solved' : ''
                                }`}
                                onClick={this.checkSQL}
                                disabled={
                                    !questions.length ||
                                    SQLCheckingFor === currTab ||
                                    checkResponseType ||
                                    !tabs[currTab].html
                                }
                                data-loading={SQLCheckingFor === currTab}
                            />
                            <button
                                className={`next-question${
                                    questions.length && questions[currQuestion].status === 'solved' ? ' active' : ''
                                }`}
                                onClick={this.nextQuestion}
                                data-tip="Следующий вопрос"
                            />
                        </div>
                        <div className={`resultbox ${SQLCheckingFor === currTab ? 'checking' : ''}`}>
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

                <div className={`test-completed${isCompletedPopupVisible ? ' active' : ''}`}>
                    <h1>Поздравляем!</h1>
                    <h2>Вы полностью прошли тест! </h2>
                </div>

                <NotificationSystem ref={this.notificationSystem} />
            </>
        );
    }
}

export default Training;
