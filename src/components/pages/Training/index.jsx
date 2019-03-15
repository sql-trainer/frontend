import React, { Component } from 'react';
import { Header } from '../../common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentEditable from 'react-contenteditable';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Table from './Table';

import './index.scss';

class Training extends Component {
    state = {
        currQuestion: 0,
        currTab: 0,
        tabs: [
            {
                html: 'select * from table',
                title: 'Tab #1',
                response: {
                    fields: [
                        { title: 'ID', name: 'id' },
                        { title: 'Name', name: 'name' },
                        { title: 'Age', name: 'age' },
                    ],
                    rows: [
                        { id: 1, name: 'andrey', age: 18 },
                        { id: 2, name: 'vasya', age: 19 },
                        { id: 2, name: 'vasya1', age: 19 },
                        { id: 2, name: 'vasya2', age: 19 },
                        { id: 2, name: 'vasya3', age: 19 },
                        { id: 2, name: 'vasya4', age: 19 },
                        { id: 2, name: 'vasya5', age: 19 },
                        { id: 2, name: 'vasya6', age: 19 },
                        { id: 2, name: 'vasya7', age: 19 },
                    ],
                },
            },
            {
                html: 'select * from table1',
                title: 'Tab #2',
            },
        ],
        database: {
            title: 'Database',
            tables: [
                {
                    title: 'Main',
                    props: [
                        { name: 'id', type: 'integer', isKey: true },
                        { name: 'permission', type: 'integer', isKey: false },
                        { name: 'title', type: 'string', isKey: false },
                    ],
                    active: false,
                },
                {
                    title: 'Users',
                    props: [
                        { name: 'id', type: 'integer', isKey: true },
                        { name: 'name', type: 'string', isKey: false },
                        { name: 'age', type: 'integer', isKey: false },
                    ],
                    active: false,
                },
            ],
        },
        questions: [
            {
                id: 1,
                question: 'Для каждого производителя найдите средний размер экрана выпускаемых им ПК-блокнотов',
                fields: ['maker', 'средний размер экрана'],
            },
            {
                id: 2,
                question: 'Вывести фамилии и возраста всех преподавателей в порядке возрастания',
                fields: ['fam'],
            },
            {
                id: 3,
                question: 'Укажите корабли, потопленные в сражениях в Северной Атлантике (North Atlantic)',
                fields: ['ship'],
            },
        ],
        isAllQOpen: false,
    };

    componentDidMount() {
        document.title = 'Training';
    }

    handleContentEditable = e => {
        const { tabs, currTab } = this.state;
        tabs[currTab].html = e.target.value;

        this.setState({ tabs });
    };

    handleQuestionSwitcher = dir => {
        const { questions, currQuestion } = this.state;
        let newQuestion = dir === 'next' ? currQuestion + 1 : currQuestion - 1;

        if (newQuestion > questions.length - 1) this.setCurrQuestion(0);
        else if (newQuestion < 0) this.setCurrQuestion(questions.length - 1);
        else this.setCurrQuestion(newQuestion);
    };

    handleQuestionChange(index) {
        this.setCurrQuestion(index);
        this.setState({ isAllQOpen: false });
    }

    createNewTab = () => {
        const { tabs } = this.state;
        this.setState({ tabs: tabs.concat([{ html: '', title: `Tab #${tabs.length + 1}` }]), currTab: tabs.length });
    };

    setCurrQuestion(index) {
        this.setState({
            currQuestion: index,
            tabs: [
                {
                    html: '',
                    title: 'Tab #1',
                },
            ],
            currTab: 0,
        });
    }

    changeTableActivity(index) {
        const { database } = this.state;

        database.tables[index].active = !database.tables[index].active;

        this.setState({ database });
    }

    render() {
        const { questions, currQuestion, isAllQOpen, tabs, currTab, database } = this.state;
        return (
            <>
                <Header />
                <section className="training">
                    <PerfectScrollbar className="task-info">
                        <div className="questionbox">
                            <div className="title">
                                <div
                                    className="menu-icon"
                                    data-tip="Список всех вопросов"
                                    onClick={e => this.setState({ isAllQOpen: !isAllQOpen })}
                                />
                                Вопрос #{currQuestion + 1} из {questions.length}
                                <FontAwesomeIcon
                                    className="question__nav"
                                    icon="angle-left"
                                    data-tip="Предыдущий вопрос"
                                    onClick={e => this.handleQuestionSwitcher('prev')}
                                />
                                <FontAwesomeIcon
                                    className="question__nav"
                                    icon="angle-left"
                                    rotation={180}
                                    data-tip="Следующий вопрос"
                                    onClick={e => this.handleQuestionSwitcher('next')}
                                />
                            </div>
                            <div className="content">
                                {questions[currQuestion].question}
                                {questions[currQuestion].fields ? (
                                    <div className="show">
                                        <b>Вывести</b>: {questions[currQuestion].fields.join(', ')}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="tablesbox">
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
                            {database.tables.map((table, index) => {
                                return (
                                    <div className="table" key={index}>
                                        <div
                                            className={`table-title ${table.active ? 'active' : ''}`}
                                            onClick={e => this.changeTableActivity(index)}
                                        >
                                            {table.title}
                                        </div>
                                        <div className={`table-props ${table.active ? 'active' : ''}`}>
                                            {table.props.map((prop, index) => (
                                                <div className={`table-prop ${prop.isKey ? 'key' : ''}`} key={index}>
                                                    <div>{prop.name}</div>
                                                    <div>{prop.type.toUpperCase()}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </PerfectScrollbar>
                    <PerfectScrollbar className="task-editor">
                        <div className="inputbox">
                            <div className="tabs">
                                {tabs.map((tab, index) => (
                                    <div
                                        className={`tab ${currTab === index ? 'active' : ''}`}
                                        onClick={e => this.setState({ currTab: index })}
                                        key={index}
                                    >
                                        {tab.title}
                                    </div>
                                ))}
                                <FontAwesomeIcon
                                    className="tab-add"
                                    icon="plus"
                                    data-tip="Добавить новую вкладку"
                                    onClick={this.createNewTab}
                                />
                            </div>
                            <PerfectScrollbar className="textarea-scrollbar">
                                <ContentEditable
                                    className="textarea"
                                    html={tabs[currTab].html}
                                    onChange={this.handleContentEditable}
                                />
                            </PerfectScrollbar>
                            <button className="check-sql" />
                        </div>
                        {tabs[currTab].response ? (
                            <div className="resultbox">
                                <Table
                                    className="response-table"
                                    fields={tabs[currTab].response.fields}
                                    rows={tabs[currTab].response.rows}
                                />
                            </div>
                        ) : null}
                    </PerfectScrollbar>
                </section>
                <div className={`all-questions ${isAllQOpen ? 'all-questions-active' : ''}`}>
                    <h2>Все вопросы</h2>
                    {questions.map((q, index) => {
                        return (
                            <div
                                className={index === currQuestion ? 'question active' : 'question'}
                                key={q.id}
                                onClick={e => this.handleQuestionChange(index)}
                            >
                                <b>{index + 1}.</b> {q.question}
                            </div>
                        );
                    })}
                </div>
                <div
                    className={`all-questions-bg ${isAllQOpen ? 'all-questions-bg-active' : ''}`}
                    onClick={e => this.setState({ isAllQOpen: !isAllQOpen })}
                />
            </>
        );
    }
}

export default Training;
