import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

class Questions extends PureComponent {
    componentDidMount() {
        ReactTooltip.rebuild();
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    render() {
        const {
            questions,
            currQuestionIndex,
            nextQuestion,
            prevQuestion,
            currQuestion,
            changeAllQuestionsVisibility,
            copyAnswerToClipboard,
            openStatModal,
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
                        <div className={`question-counter`}>
                            Вопрос {!questionsLength ? '' : `#${currQuestionIndex + 1} из ${questionsLength}`}
                            {currQuestion.sql !== undefined && (
                                <>
                                    <div className="solved-icon" />
                                    <div
                                        className="copy-icon"
                                        data-tip="Скопировать последний правильный ответ"
                                        onClick={e => copyAnswerToClipboard(currQuestion.sql)}
                                    />
                                </>
                            )}
                        </div>
                        {questionsLength ? (
                            <>
                                <div
                                    className="test-info-icon"
                                    onClick={openStatModal}
                                    data-tip="Статистика по тесту"
                                />
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
