import { connect } from 'react-redux';
import { loadDatabaseFromAPI } from '../../../../store/actions/databaseActions';
import { changeCurrQuestion, nextQuestion, prevQuestion } from '../../../../store/actions/questionActions';
import { addNotification } from '../../../../store/actions/notificationActions';

import Questions from '../Questions';

const mapStateToProps = ({ questions, database }, ownProps) => {
    return {
        questions: questions.questions,
        checkingFor: questions.checkingFor,
        isQuestionsLoading: questions.isQuestionsLoading,
        currQuestionIndex: questions.currQuestionIndex,
        database: database.database,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDatabaseFromAPI: (id, addNotification) => dispatch(loadDatabaseFromAPI(id, addNotification)),
        changeCurrQuestion: id => dispatch(changeCurrQuestion(id)),
        addNotification: (message, level) => dispatch(addNotification(message, level)),
        nextQuestion: () => dispatch(nextQuestion()),
        prevQuestion: () => dispatch(prevQuestion()),
    };
};

export const QuestionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Questions);
