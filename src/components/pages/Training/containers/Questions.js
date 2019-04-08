import { connect } from 'react-redux';
import { loadDatabaseFromAPI } from '../../../../store/actions/databaseActions';
import { changeCurrQuestion } from '../../../../store/actions/questionActions';
import { addNotification } from '../../../../store/actions/notificationActions';

import Questions from '../Questions';

const mapStateToProps = (state, ownProps) => {
    return {
        questions: state.questions.questions,
        checkingFor: state.questions.checkingFor,
        isQuestionsLoading: state.questions.isQuestionsLoading,
        currQuestionIndex: state.questions.currQuestionIndex,
        database: state.database.database,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDatabaseFromAPI: (id, addNotification) => dispatch(loadDatabaseFromAPI(id, addNotification)),
        changeCurrQuestion: id => dispatch(changeCurrQuestion(id)),
        addNotification: (message, level) => dispatch(addNotification(message, level)),
    };
};

export const QuestionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Questions);
