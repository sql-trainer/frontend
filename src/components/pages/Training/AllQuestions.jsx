import React, { Component } from 'react';
import CustomScrollbars from './CustomScrollbars';

class AllQuestions extends Component {
    handleQuestionChange(index) {
        this.props.loadDatabaseOnChange(index);
        this.props.changeAllQuestionsBlockVisibility();
    }

    render() {
        const { questions, currQuestionIndex, isAllQOpen, changeAllQuestionsBlockVisibility } = this.props;
        const questionsLength = questions.length;

        return (
            <>
                <div className={`all-questions ${isAllQOpen ? 'all-questions-active' : ''}`}>
                    <CustomScrollbars prefix="all-questions">
                        <h2>{questionsLength ? 'Все вопросы' : 'Вопросы отстутствуют'}</h2>
                        {questions.map((q, index) => {
                            const className = `question${index === currQuestionIndex ? ' active' : ''}${
                                questions[index].sql !== undefined ? ' solved' : ''
                            }`;
                            return (
                                <div className={className} key={q.id} onClick={e => this.handleQuestionChange(index)}>
                                    <b>{index + 1}.</b> {q.question}
                                </div>
                            );
                        })}
                    </CustomScrollbars>
                </div>
                <div
                    className={`all-questions-bg ${isAllQOpen ? 'all-questions-bg-active' : ''}`}
                    onClick={changeAllQuestionsBlockVisibility}
                />
            </>
        );
    }
}

export default AllQuestions;
