import { connect } from 'react-redux';
import {
    changeCurrQuestion,
    changeAllQuestionsVisibility,
    loadDatabaseOnChange,
} from '../../../../store/actions/questionActions';

import AllQuestions from '../AllQuestions';

const mapStateToProps = ({ questions, database }, ownProps) => {
    return {
        questions: questions.questions,
        isAllQOpen: questions.isAllQOpen,
        currQuestionIndex: questions.currQuestionIndex,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeCurrQuestion: id => dispatch(changeCurrQuestion(id)),
        loadDatabaseOnChange: id => dispatch(loadDatabaseOnChange(id)),
        changeAllQuestionsVisibility: () => dispatch(changeAllQuestionsVisibility()),
    };
};

export const AllQuestionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AllQuestions);
