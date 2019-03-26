import { connect } from 'react-redux';
import {
    loadQuestionsFromAPI,
    changeCurrQuestion,
    changeQuestionStatus,
} from '../../../../store/actions/questionActions';
import { loadDatabaseFromAPI, changeTableActivity } from '../../../../store/actions/databaseActions';
import { changeTabResponse, deleteAllTabs, changeTabHtml } from '../../../../store/actions/tabsActions';

import Training from '../index';

const mapStateToProps = ({ questions, database, tabs }, ownProps) => {
    return {
        questions: questions.questions,
        isQuestionsLoading: questions.isQuestionsLoading,
        currQuestion: questions.currQuestion,
        database: database.database,
        isDatabaseLoading: database.isDatabaseLoading,
        tabs: tabs.tabs,
        currTab: tabs.currTab,
        tooltip: ownProps.tooltip,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadQuestionsFromAPI: addNotification => {
            dispatch(loadQuestionsFromAPI(addNotification));
        },
        changeQuestionStatus: status => {
            dispatch(changeQuestionStatus(status));
        },
        changeCurrQuestion: id => {
            dispatch(changeCurrQuestion(id));
        },
        loadDatabaseFromAPI: (id, addNotification) => {
            dispatch(loadDatabaseFromAPI(id, addNotification));
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
