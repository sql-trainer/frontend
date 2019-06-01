import React, { PureComponent } from 'react';
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
            changeAllQuestionsBlockVisibility,
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
                            onClick={changeAllQuestionsBlockVisibility}
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
                                <div
                                    className="question__nav question-prev-icon"
                                    onClick={prevQuestion}
                                    data-tip="Предыдущий вопрос"
                                />
                                <div
                                    className="question__nav question-next-icon"
                                    onClick={nextQuestion}
                                    data-tip="Следующий вопрос"
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
                                    <b>Вывести:</b>
                                    {currQuestion.fields.map((f, index) => {
                                        const field = f.slice(0, f.length - 7);
                                        const tipText = `Для аггрегатной функции используйте конструкцию ' ... as ${field}'`;

                                        return (
                                            <div key={index} className="question-field">
                                                {f.endsWith('[alias]') ? (
                                                    <>
                                                        {field}
                                                        <b data-tip={tipText}>[alias]</b>
                                                    </>
                                                ) : (
                                                    f
                                                )}
                                                {/* {currQuestion.fields.length - 1 !== index ? ',' : ''} */}
                                            </div>
                                        );
                                    })}
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
