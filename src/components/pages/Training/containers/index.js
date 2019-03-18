import { connect } from 'react-redux';
import { loadQuestionsFromAPI, changeCurrQuestion } from '../../../../store/actions/questionActions';
import { loadDatabaseFromAPI, changeTableActivity } from '../../../../store/actions/databaseActions';
import { changeTabResponse, deleteAllTabs, changeTabHtml } from '../../../../store/actions/tabsActions';

import Training from '../index';

const mapStateToProps = state => {
    return {
        questions: state.questions.questions,
        isQuestionsLoading: state.questions.isQuestionsLoading,
        currQuestion: state.questions.currQuestion,
        database: state.database.database,
        isDatabaseLoading: state.database.isDatabaseLoading,
        tabs: state.tabs.tabs,
        currTab: state.tabs.currTab,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadQuestionsFromAPI: () => {
            dispatch(loadQuestionsFromAPI());
        },
        changeCurrQuestion: id => {
            dispatch(changeCurrQuestion(id));
        },
        loadDatabaseFromAPI: id => {
            dispatch(loadDatabaseFromAPI(id));
        },
        changeTableActivity: id => {
            dispatch(changeTableActivity(id));
        },
        changeTabResponse: (response, index) => {
            dispatch(changeTabResponse(response, index));
        },
        deleteAllTabs: () => {
            dispatch(deleteAllTabs());
        },
        changeTabHtml: (index, html) => {
            dispatch(changeTabHtml(index, html));
        },
    };
};

const TrainingContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Training);

export default TrainingContainer;
