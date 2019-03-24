import { connect } from 'react-redux';
import { deleteAllTabs } from '../../../../store/actions/tabsActions';
import { loadDatabaseFromAPI } from '../../../../store/actions/databaseActions';
import { changeCurrQuestion } from '../../../../store/actions/questionActions';

import Questions from '../Questions';

const mapStateToProps = (state, ownProps) => {
    return {
        questions: state.questions.questions,
        isQuestionsLoading: state.questions.isQuestionsLoading,
        currQuestion: state.questions.currQuestion,
        database: state.database.database,
        addNotification: ownProps.addNotification,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteAllTabs: () => {
            dispatch(deleteAllTabs());
        },
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
