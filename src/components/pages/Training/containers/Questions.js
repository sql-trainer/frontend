import { connect } from 'react-redux';
import { loadDatabaseFromAPI } from '../../../../store/actions/databaseActions';
import { changeCurrQuestion } from '../../../../store/actions/questionActions';

import Questions from '../Questions';

const mapStateToProps = (state, ownProps) => {
    return {
        questions: state.questions.questions,
        isQuestionsLoading: state.questions.isQuestionsLoading,
        currQuestion: state.questions.currQuestion,
        database: state.database.database,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDatabaseFromAPI: (id, addNotification) => {
            dispatch(loadDatabaseFromAPI(id, addNotification));
        },
        changeCurrQuestion: id => {
            dispatch(changeCurrQuestion(id));
        },
    };
};

const QuestionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Questions);

export default QuestionsContainer;
