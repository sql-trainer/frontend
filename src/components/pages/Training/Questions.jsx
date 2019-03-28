import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Questions extends Component {
    state = {
        isAllQOpen: false,
    };

    handleQuestionChange(index) {
        this.props.setCurrQuestion(index);
        this.setState({ isAllQOpen: false });
    }

    render() {
        const { questions, currQuestion, isQuestionsLoading, nextQuestion, prevQuestion } = this.props;
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
                                questions.length && questions[currQuestion].status === 'solved' ? ' solved' : ''
                            }`}
                        >
                            Вопрос {!questionsLength ? '' : `#${currQuestion + 1} из ${questionsLength}`}
                        </div>
                        {questionsLength ? (
                            <>
                                <FontAwesomeIcon
                                    className="question__nav"
                                    icon="angle-left"
                                    data-tip="Предыдущий вопрос"
                                    onClick={prevQuestion}
                                />
                                <FontAwesomeIcon
                                    className="question__nav"
                                    icon="angle-left"
                                    rotation={180}
                                    data-tip="Следующий вопрос"
                                    onClick={nextQuestion}
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
                        const className = `question${index === currQuestion ? ' active' : ''}${
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
