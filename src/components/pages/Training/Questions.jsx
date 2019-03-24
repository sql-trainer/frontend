import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Questions extends Component {
    state = {
        isAllQOpen: false,
    };

    handleQuestionSwitcher = dir => {
        const { questions, currQuestion } = this.props;
        let newQuestion = dir === 'next' ? currQuestion + 1 : currQuestion - 1;

        if (newQuestion > questions.length - 1) newQuestion = 0;
        else if (newQuestion < 0) newQuestion = questions.length - 1;

        this.setCurrQuestion(newQuestion);
    };

    handleQuestionChange(index) {
        this.setCurrQuestion(index);
        this.setState({ isAllQOpen: false });
    }

    setCurrQuestion(index) {
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
    }

    render() {
        const { questions, currQuestion, isQuestionsLoading } = this.props;
        const { isAllQOpen } = this.state;

        const questionsLength = questions.length;

        return (
            <>
                <div className="questionbox" data-loading={isQuestionsLoading}>
                    <div className="title">
                        <div
                            className="menu-icon"
                            data-tip="Список всех вопросов"
                            onClick={e => this.setState({ isAllQOpen: !isAllQOpen })}
                        />
                        Вопрос {!questionsLength ? '' : `#${currQuestion + 1} из ${questionsLength}`}
                        {questionsLength ? (
                            <>
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
                            </>
                        ) : null}
                    </div>
                    {!questionsLength ? (
                        <div className="placeholder">Вопрос не загружен</div>
                    ) : (
                        <div className="content">
                            {questions[currQuestion].question}
                            {questions[currQuestion].fields ? (
                                <div className="show">
                                    <b>Вывести</b>: {questions[currQuestion].fields.join(', ')}
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
                <div className={`all-questions ${isAllQOpen ? 'all-questions-active' : ''}`}>
                    <h2>{questionsLength ? 'Все вопросы' : 'Вопросы отстутствуют'}</h2>

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

export default Questions;
