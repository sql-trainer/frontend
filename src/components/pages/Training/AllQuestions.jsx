import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CustomScrollbars from './CustomScrollbars';

class AllQuestions extends Component {
    handleQuestionChange(index) {
        this.props.changeCurrQuestion(index);
        this.props.changeAllQuestionsVisibility();
    }

    render() {
        const { questions, currQuestionIndex, isAllQOpen, changeAllQuestionsVisibility } = this.props;
        const questionsLength = questions.length;

        return (
            <>
                <div className={`all-questions ${isAllQOpen ? 'all-questions-active' : ''}`}>
                    <CustomScrollbars>
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
                    </CustomScrollbars>
                </div>
                <div
                    className={`all-questions-bg ${isAllQOpen ? 'all-questions-bg-active' : ''}`}
                    onClick={changeAllQuestionsVisibility}
                />
            </>
        );
    }
}

export default AllQuestions;
