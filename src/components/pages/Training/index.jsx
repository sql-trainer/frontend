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

import classNames from 'classnames';

import './index.scss';
import './media.scss';
import 'prismjs/themes/prism.css';

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

    saveToLocalStorage = props => {
        for (let key in props) {
            localStorage.setItem(key, props[key]);
        }
    };

    getFromLocalStorage = props => {
        const map = {};
        props.forEach(prop => {
            if (typeof prop === 'string') map[prop] = localStorage.getItem(prop);
            else
                map[prop.field] = prop.parseJson
                    ? JSON.parse(localStorage.getItem(prop.field))
                    : localStorage.getItem(prop.field);
        });
        return map;
    };

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
        const { questions, loadQuestionsFromAPI } = this.props;
        document.title = 'Training';
        document.querySelector('.app').className = 'app training-component';
        if (!questions.length) {
            loadQuestionsFromAPI(this.addNotification, this.getFromLocalStorage, this.saveToLocalStorage);
        }
    }

    handleContentEditable = value => {
        const { changeTabHtml } = this.props;
        changeTabHtml(this.currTabIndex, value);
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
            changeTabResponse,
            questions,
            currQuestion,
            changeQuestionStatus,
            changeSolvedQuestionSQL,
        } = this.props;

        const { isTestCompleted } = this.state;
        let currTabIndex = this.currTabIndex;

        this.setState({ SQLCheckingFor: currTabIndex });

        const sql = this.tabs[currTabIndex].html;

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
                        if (questions[currQuestion].status !== 'solved') changeQuestionStatus('solved');
                        changeSolvedQuestionSQL(sql);
                    }
                    changeTabResponse(currTabIndex, { fields: res.fields, rows: res.rows });
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
                this.saveToLocalStorage({ questions: JSON.stringify(questions) });
            });
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
        const { questions, loadDatabaseFromAPI, database, changeCurrQuestion, addNotification } = this.props;
        this.saveToLocalStorage({ lastQuestion: index });

        if (!database || questions[index].database !== database.id) {
            loadDatabaseFromAPI(questions[index].database, addNotification);
        }

        changeCurrQuestion(index);
    };

    checkTestResult = () => {
        const { questions } = this.props;
        return questions.findIndex(q => q.status !== 'solved') === -1;
    };

    resetTest = e => {
        e.preventDefault();
        this.props.loadQuestionsFromAPI();
        this.props.changeCurrQuestion(0);
        this.props.deleteAllTabs();
        this.setState({ isCompletedPopupVisible: false });
    };

    closeCompletedPopup = () => {
        this.setState({ isCompletedPopupVisible: false });
    };

    saveOnEdit = () => {
        if (this.state.saveTimeoutID !== undefined) {
            clearTimeout(this.state.saveTimeoutID);
        }

        const timeoutID = setTimeout(() => {
            this.saveToLocalStorage({ questions: JSON.stringify(this.props.questions) });
            console.log('saved');
        }, 1000);

        this.setState({ saveTimeoutID: timeoutID });
    };

    get tabs() {
        const { questions, currQuestion } = this.props;
        return questions.length ? questions[currQuestion].tabs : [{ html: '', title: 'Tab' }];
    }

    get currTab() {
        const { questions, currQuestion } = this.props;
        return questions.length ? this.tabs[questions[currQuestion].currTab] : this.tabs[0];
    }

    get currTabIndex() {
        const { questions, currQuestion } = this.props;
        return questions.length ? questions[currQuestion].currTab : 0;
    }

    get currQuestion() {
        const { questions, currQuestion } = this.props;
        return questions.length ? questions[currQuestion] : undefined;
    }

    render() {
        const { isInputAreaPinned, SQLCheckingFor, checkResponseType, isCompletedPopupVisible } = this.state;
        const { database, isDatabaseLoading, changeTableActivity, questions, currQuestion } = this.props;

        const tabs = this.tabs;
        const currTab = this.currTab;
        const currTabIndex = this.currTabIndex;

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
                        <div className={classNames('inputbox', { pinned: isInputAreaPinned })}>
                            <TabsContainer
                                tabs={tabs}
                                currTab={currTabIndex}
                                isInputAreaPinned={isInputAreaPinned}
                                pinInputArea={this.pinInputArea}
                            />
                            <PerfectScrollbar className="textarea-scrollbar">
                                <Editor
                                    value={currTab.html}
                                    onValueChange={code => this.handleContentEditable(code)}
                                    highlight={code => this.highlightSQL(code)}
                                    className="textarea"
                                    tabSize={4}
                                    onKeyUp={this.saveOnEdit}
                                />
                            </PerfectScrollbar>
                            <button
                                className={classNames('check-sql', checkResponseType, {
                                    solved: questions.length && questions[currQuestion].status === 'solved',
                                })}
                                onClick={this.checkSQL}
                                disabled={
                                    !questions.length ||
                                    SQLCheckingFor === currTabIndex ||
                                    checkResponseType ||
                                    !currTab.html
                                }
                                data-loading={SQLCheckingFor === currTabIndex}
                            />
                            <button
                                className={`next-question${
                                    questions.length && questions[currQuestion].status === 'solved' ? ' active' : ''
                                }`}
                                onClick={this.nextQuestion}
                                data-tip="Следующий вопрос"
                            />
                        </div>
                        <div className={`resultbox${SQLCheckingFor === currTabIndex ? ' checking' : ''}`}>
                            {currTab.response ? (
                                <Table
                                    className={`response-table ${isInputAreaPinned ? ' pinned' : ''}`}
                                    fields={currTab.response.fields}
                                    rows={currTab.response.rows}
                                />
                            ) : null}
                        </div>
                    </PerfectScrollbar>
                </section>

                <div className={`test-completed${isCompletedPopupVisible ? ' active' : ''}`}>
                    <FontAwesomeIcon
                        icon="times"
                        className="close-completed-popup"
                        onClick={this.closeCompletedPopup}
                    />
                    <h1>Поздравляем!</h1>
                    <h2>Вы полностью прошли тест!</h2>
                    <h3>
                        Теперь вы можете{' '}
                        <a href="/" onClick={this.resetTest}>
                            сбросить
                        </a>{' '}
                        свой результат и пройти тест заново, либо посмотреть свои текущие ответы на вопросы, просто
                        перейдя на нужный.
                    </h3>
                </div>

                <NotificationSystem ref={this.notificationSystem} />
            </>
        );
    }
}

export default Training;
