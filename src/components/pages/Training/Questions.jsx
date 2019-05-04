import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Questions extends Component {
    render() {
        const {
            questions,
            currQuestionIndex,
            nextQuestion,
            prevQuestion,
            currQuestion,
            changeAllQuestionsVisibility,
        } = this.props;
        const questionsLength = questions.length;

        return (
            <>
                <div className="questionbox">
                    <div className="title">
                        <div
                            className="menu-icon"
                            data-tip="Список всех вопросов"
                            onClick={changeAllQuestionsVisibility}
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
                            {currQuestion.question}
                            {currQuestion.fields ? (
                                <div className="show">
                                    <b>Вывести</b>: {currQuestion.fields.join(', ')}
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default Questions;
