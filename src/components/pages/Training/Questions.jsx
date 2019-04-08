import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import store from '../../../modules/store';

class Questions extends Component {
    state = {
        isAllQOpen: false,
    };

    handleQuestionChange(index) {
        this.setCurrQuestion(index);
        this.setState({ isAllQOpen: false });
    }

    nextQuestion = () => {
        const { questions, currQuestionIndex } = this.props;
        const newQuestion = currQuestionIndex + 1 > questions.length - 1 ? 0 : currQuestionIndex + 1;

        this.setCurrQuestion(newQuestion);
    };

    prevQuestion = () => {
        const { questions, currQuestionIndex } = this.props;
        const newQuestion = currQuestionIndex - 1 < 0 ? questions.length - 1 : currQuestionIndex - 1;

        this.setCurrQuestion(newQuestion);
    };

    setCurrQuestion = index => {
        const { questions, loadDatabaseFromAPI, database, changeCurrQuestion } = this.props;
        store.set('lastQuestion', index);

        if (!database || questions[index].database !== database.id) {
            loadDatabaseFromAPI(questions[index].database);
        }

        changeCurrQuestion(index);
    };

    render() {
        const { questions, currQuestion, currQuestionIndex, isQuestionsLoading } = this.props;
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
                        <div
                            className={`question-counter${
                                questions.length && currQuestion.status === 'solved' ? ' solved' : ''
                            }`}
                        >
                            Вопрос {!questionsLength ? '' : `#${currQuestionIndex + 1} из ${questionsLength}`}
                        </div>
                        {questionsLength ? (
                            <>
                                <FontAwesomeIcon
                                    className="question__nav"
                                    icon="angle-left"
                                    data-tip="Предыдущий вопрос"
                                    onClick={this.prevQuestion}
                                />
                                <FontAwesomeIcon
                                    className="question__nav"
                                    icon="angle-left"
                                    rotation={180}
                                    data-tip="Следующий вопрос"
                                    onClick={this.nextQuestion}
                                />
                            </>
                        ) : null}
                    </div>
                    {!questionsLength ? (
                        <div className="placeholder">Вопрос не загружен</div>
                    ) : (
                        <div className="content">
                            {currQuestion.question}
                            {currQuestion.fields ? (
                                <div className="show">
                                    <b>Вывести</b>: {currQuestion.fields.join(', ')}
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>

                <div className={`all-questions ${isAllQOpen ? 'all-questions-active' : ''}`}>
                    <h2>{questionsLength ? 'Все вопросы' : 'Вопросы отстутствуют'}</h2>
                    {questions.map((q, index) => {
                        const className = `question${index === currQuestionIndex ? ' active' : ''}${
                            questions[index].status === 'solved' ? ' solved' : ''
                        }`;
                        return (
                            <div className={className} key={q.id} onClick={e => this.handleQuestionChange(index)}>
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
